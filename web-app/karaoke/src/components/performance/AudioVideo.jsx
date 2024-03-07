import Navbar from "../Sidebar"; 

const AudioVideo = () => {
    const videoStream = "http://localhost:8080/video-feed"; 

    const startRecording = async () => {
        const response = await fetch('http://localhost:8080/start-recording', { method: 'POST' });
        console.log('Recording started:', await response.text());
    };

    const playRecording = async () => {
        const audio = await fetch('http://localhost:8080/play-recording', {method: 'GET'});
        console.log('Recording playing', await response.text());
    };

    return ( <><Navbar></Navbar>
        <div>
            <img src={videoStream} alt='video-feed' width="390" height="250"/>
            <br></br>
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={playRecording}>Play Recording</button>
        </div>
    </>); 
}
export default AudioVideo; 