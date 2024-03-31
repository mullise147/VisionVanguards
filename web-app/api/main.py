from flask import Flask, jsonify, Response, render_template, send_file, send_from_directory
from flask_cors import CORS
import threading
import time
import sys
import os
sys.path.append('../')
sys.path.append("../../")
sys.path.append("../../..")


from AudioProcessing import AudioProcessor as audio
from CV_Component import PoseModule as cv

record_time = 60

app = Flask(__name__)
CORS(app)

player = audio.AudioPlayer()
recorder = audio.AudioRecorder()
transcriber = audio.AudioTranscriber()
lyrics_comparator = audio.LyricsComparator()
pitch_processor = audio.PitchProcessor()
camera = cv.PoseDetector()

@app.route('/hello')
def hello():
    '''
    API that returns "Hello World" when called. 
    '''
    return 'Hello, World!'

# @app.route('/start-performance', methods=['POST'])
# def start_performance():
#     # Start the PoseDetector in a separate thread
#     threading.Thread(target=camera.getFrame(), daemon=True).start()
#     time.sleep(3)  # Delay to sync with countdown in frontend
#     # Start recording and playing audio
#     threading.Thread(target=lambda: recorder.record_audio("user_audio.wav", 60), daemon=True).start()
#     player.play_audio("Single_Ladies.wav")
#     return jsonify({"message": "Performance started"})

@app.route("/video-feed")
def video_feed():
    return Response(camera.getFrame(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route("/start-recording", methods=["POST"])
def start_recording():
    global recorder_instance
    recorder_instance = audio.AudioRecorder()
    threading.Thread(target=recorder_instance.record_audio, args=("user_audio.wav", record_time)).start()
    return "Recording started", 200

@app.route("/stop-recording", methods=["POST"])
def stop_recording():
    global recorder_instance
    print("in stop recording")
    recorder_instance = audio.AudioRecorder()
    if recorder_instance:
        recorder_instance.stop_recording()
        return "Recording stopped", 200
    return "No recording to stop", 404


# @app.route("/play-recording", methods=["GET"])
# # @app.route("/play-recording")
# def play_recording():
#     player = audio.AudioPlayer()
#     player.play_audio("user_recording.wav")
#     return send_file("user_recording.wav", as_attachment=True)


@app.route("/audio-feed")
def audio_feed():
    player = audio.AudioPlayer()
    recorder = audio.AudioRecorder()
    transcriber = audio.AudioTranscriber()
    lyrics_comparator = audio.LyricsComparator()
    pitch_processor = audio.PitchProcessor()
    original_audio_file = "single_ladies.wav"
    output_audio_file = "output.wav"
    original_lyrics_file = "lyrics.txt"

    processor = audio.AudioProcessor(player, recorder, transcriber, lyrics_comparator, pitch_processor, original_audio_file, output_audio_file, original_lyrics_file)

    recorder.record_audio(output_audio_file, record_time)
    player.play_audio(output_audio_file)

@app.route("/return-wav")
def return_wav():
    return 

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

@app.route('/pose-timings', methods=['GET'])
def get_pose_timings():
    directory = os.path.join(app.root_path)  # Adjust this path to the directory of your poses_timings.txt file
    return send_from_directory(directory, 'poses_timings.txt')

def read_file(file_path):
    with open(file_path, 'r') as file:
        return file.read()
    

if __name__ == '__main__':
    print(app.root_path)
    app.run(host='0.0.0.0', port=8080)