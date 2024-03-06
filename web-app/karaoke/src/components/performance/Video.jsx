const Video = () => {
    const videoStream = "http://localhost:8080/video-feed"; 
    return (
        <div>
            <img src={videoStream} alt='video-feed'/>
        </div>
    ); 
}
export default Video; 