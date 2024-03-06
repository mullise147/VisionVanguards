from flask import Flask, Response, render_template
from flask_cors import CORS
import sys
sys.path.append('../') 
sys.path.append("../../")
sys.path.append("../../../")

from CV_Component import PoseModule


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


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
    
    while True:
        frame = camera.getFrame()
        
        # return(camera.getFrame())
       # mimetype='multipart/x-mixed-replace; boundary=frame')
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)

