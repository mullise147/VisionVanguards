from flask import Flask, Response, render_template, send_file
from flask_cors import CORS
import sys
sys.path.append('../') 
sys.path.append("../../")
sys.path.append("../../../")

from CV_Component import PoseModule
from AudioProcessing import AudioProcessor

record_time = 22 

app = Flask(__name__)
CORS(app)


@app.route('/hello')
def hello():
    '''
    API that returns "Hello World" when called. 
    '''
    return 'Hello, World!'

#Make more API endpoints? 

#/audio-processing
#/computer-vision

@app.route("/video-feed")
def video_feed(): 
    camera = PoseModule.PoseDetector()
    return Response(camera.getFrame(), mimetype='multipart/x-mixed-replace; boundary=frame')
    
@app.route("/start-recording", methods=["POST"])
def start_recording():
    recorder = AudioProcessor.AudioRecorder()
    recorder.record_audio("user_recording.wav", record_time) 
    return "Recording started", 200

@app.route("/play-recording", methods=["GET"])
def play_recording():
    player = AudioProcessor.AudioPlayer()
    player.play_audio("user_recording.wav")
    return send_file("user_recording.wav", as_attachment=True)

@app.route("/audio-feed")
def audio_feed():
    player = AudioProcessor.AudioPlayer()
    recorder = AudioProcessor.AudioRecorder()
    transcriber = AudioProcessor.AudioTranscriber()
    lyrics_comparator = AudioProcessor.LyricsComparator()
    pitch_processor = AudioProcessor.PitchProcessor()
    original_audio_file = "single_ladies.wav"
    output_audio_file = "output.wav"
    original_lyrics_file = "lyrics.txt"

    processor = AudioProcessor.AudioProcessor(player, recorder, transcriber, lyrics_comparator, pitch_processor, original_audio_file, output_audio_file, original_lyrics_file)

    recorder.record_audio(output_audio_file, record_time)
    player.play_audio(output_audio_file)

@app.route("/return-wav")
def return_wav():
    return 
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)

