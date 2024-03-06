import pygame
# import pyaudio
import wave
import threading
import sounddevice as sd
import soundfile as sf
import speech_recognition as sr
import librosa
import numpy as np

class AudioPlayer:
    def play_audio(self, file_path: str) -> None:
        pygame.mixer.init()
        pygame.mixer.music.load(file_path)
        pygame.mixer.music.play()
        while pygame.mixer.music.get_busy():
            pygame.time.Clock().tick(10)

# This class was initially implemented with PyAudio, but due to some library issues we're trying something different. Will be deleted once we determine that we don't need it.
# class AudioRecorder:
#     def record_audio(self, output_filename: str, record_seconds: int) -> None:
#         FORMAT = pyaudio.paInt16
#         CHANNELS = 1
#         RATE = 44100
#         CHUNK = 1024

#         with pyaudio.PyAudio() as audio:
#             stream = audio.open(format=FORMAT, channels=CHANNELS,
#                                 rate=RATE, input=True,
#                                 frames_per_buffer=CHUNK)
#             frames = [stream.read(CHUNK) for _ in range(0, int(RATE / CHUNK * record_seconds))]
#             stream.stop_stream()
#             stream.close()

#             with wave.open(output_filename, 'wb') as waveFile:
#                 waveFile.setnchannels(CHANNELS)
#                 waveFile.setsampwidth(audio.get_sample_size(FORMAT))
#                 waveFile.setframerate(RATE)
#                 waveFile.writeframes(b''.join(frames))

class AudioRecorder:
    def record_audio(self, output_filename: str, record_seconds: int) -> None:
        RATE = 44100
        CHANNELS = 1

        recording = sd.rec(int(record_seconds * RATE), samplerate=RATE, channels=CHANNELS)
        sd.wait()  # Wait until recording is finished
        sf.write(output_filename, recording, RATE)


class AudioTranscriber:
    def transcribe_audio(self, audio_file: str) -> str:
        r = sr.Recognizer()
        try:
            with sr.AudioFile(audio_file) as source:
                recorded_audio = r.record(source)
            return r.recognize_google(recorded_audio)
        except sr.UnknownValueError:
            return "Could not understand audio"
        except sr.RequestError as e:
            return f"Error: {e}"

class LyricsComparator:
    def compare_lyrics(self, original_lyrics: str, user_lyrics: str) -> float:
        words_original = set(original_lyrics.lower().split())
        words_user = set(user_lyrics.lower().split())

        common_words = words_original.intersection(words_user)
        total_words = max(len(words_original), len(words_user))

        similarity_score = len(common_words) / total_words * 100
        return similarity_score

class PitchProcessor:
    def extract_pitch(self, file_path: str, sr=22050, frame_length=2048, hop_length=512) -> list:
        audio, sr = librosa.load(file_path, sr=sr)
        pitches, magnitudes = librosa.piptrack(y=audio, sr=sr, n_fft=frame_length, hop_length=hop_length)

        dominant_pitches = []
        for t in range(pitches.shape[1]):
            index = magnitudes[:, t].argmax()
            pitch = pitches[index, t]
            dominant_pitches.append(pitch)

        return dominant_pitches

    def compare_pitches(self, original_pitches: list, user_pitches: list, tolerance=0.8) -> float:
        length = min(len(original_pitches), len(user_pitches))
        original_pitches = original_pitches[:length]
        user_pitches = user_pitches[:length]

        hits = 0
        for original, user in zip(original_pitches, user_pitches):
            if original == 0 or user == 0:  # Skip silence
                continue
            ratio = min(original, user) / max(original, user)
            if ratio > tolerance or int(np.log2(original/user)) == 0:  # within tolerance or same octave
                hits += 1

        score = hits / length * 100
        return score

class AudioProcessor:
    def __init__(self, player: AudioPlayer, recorder: AudioRecorder, transcriber: AudioTranscriber, 
                 lyrics_comparator: LyricsComparator, pitch_processor: PitchProcessor, 
                 audio_file: str, record_file: str, duration: int, original_lyrics: str):
        self.player = player
        self.recorder = recorder
        self.transcriber = transcriber
        self.lyrics_comparator = lyrics_comparator
        self.pitch_processor = pitch_processor
        self.audio_file = audio_file
        self.record_file = record_file
        self.duration = duration
        self.original_lyrics = original_lyrics

    def process_audio(self) -> tuple:
        self.duration = librosa.get_duration(filename=self.audio_file)

        # Play and record in separate threads
        play_thread = threading.Thread(target=self.player.play_audio, args=(self.audio_file,))
        record_thread = threading.Thread(target=self.recorder.record_audio, args=(self.record_file, self.duration))

        play_thread.start()
        record_thread.start()

        play_thread.join()
        record_thread.join()

        user_lyrics = self.transcriber.transcribe_audio(self.record_file)
        lyrics_score = self.lyrics_comparator.compare_lyrics(self.original_lyrics, user_lyrics)

        original_pitches = self.pitch_processor.extract_pitch(self.audio_file)
        user_pitches = self.pitch_processor.extract_pitch(self.record_file)
        pitch_score = self.pitch_processor.compare_pitches(original_pitches, user_pitches)

        composite_score = (lyrics_score + pitch_score) / 2
        return lyrics_score, pitch_score, composite_score
