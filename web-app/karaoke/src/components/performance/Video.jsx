const Video = () => {
    const videoStream = "http://localhost:8080/video-feed"; 
    return (
        <div>
             <img src={videoStream} alt='video-feed' width="390" height="250"/>
        </div>
    ); 
}
export default Video; 