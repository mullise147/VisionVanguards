from flask import Flask
from flask_cors import CORS


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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)

