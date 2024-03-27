from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import threading
import time
import sys
sys.path.append('../')
sys.path.append("../../")
sys.path.append("../../..")

from AudioProcessing import AudioProcessor as audio
from CV_Component import PoseModule as cv

app = Flask(__name__)
CORS(app)

player = audio.AudioPlayer()
recorder = audio.AudioRecorder()
transcriber = audio.AudioTranscriber()
lyrics_comparator = audio.LyricsComparator()
pitch_processor = audio.PitchProcessor()
camera = cv.PoseDetector()

@app.route('/start-performance', methods=['POST'])
def start_performance():
    # Start the PoseDetector in a separate thread
    threading.Thread(target=camera.getFrame(), daemon=True).start()
    time.sleep(3)  # Delay to sync with countdown in frontend
    # Start recording and playing audio
    threading.Thread(target=lambda: recorder.record_audio("user_audio.wav", 60), daemon=True).start()
    player.play_audio("Single_Ladies.wav")
    return jsonify({"message": "Performance started"})

@app.route('/get-scores', methods=['GET'])
def get_scores():
    lyrics_score = lyrics_comparator.compare_lyrics(read_file("simplified_lyrics.txt"), transcriber.transcribe_audio("user_audio.wav"))
    pitch_score = pitch_processor.compare_pitches(
        pitch_processor.extract_pitch("song_vocals.wav"),
        pitch_processor.extract_pitch("user_audio.wav")
    )
    cv_score = camera.saveScore()
    weighted_score = (2 * cv_score + lyrics_score + pitch_score) / 4  # Weighted score calculation
    return jsonify({"lyrics_score": lyrics_score, "pitch_score": pitch_score, "cv_score": cv_score, "weighted_score": weighted_score})

@app.route('/lyrics', methods=['GET'])
def get_lyrics():
    return send_from_directory('.', 'lyrics.txt')

@app.route('/lyrics-timings', methods=['GET'])
def get_lyrics_timings():
    return send_from_directory('.', 'lyrics_timings.txt')

def read_file(file_path):
    with open(file_path, 'r') as file:
        return file.read()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)