
// import React, { useState, useEffect } from 'react';
// import Navbar from "../Sidebar";
// import SingleLadiesAudioPlayer from "./SingleLadiesAudioPlayer";

// const AudioVideo = () => {
//     const [showContent, setShowContent] = useState(false);
//     const [countdown, setCountdown] = useState(5); // Start countdown at 3 seconds
//     const [buttonClicked, setButtonClicked] = useState(false); // Track if the countdown button has been clicked
//     const videoStream = "http://localhost:8080/video-feed";

//     useEffect(() => {
//         // Countdown logic
//         if (countdown > 0 && buttonClicked) {
//             setTimeout(() => setCountdown(countdown - 1), 1000);
//         } else if (!showContent && buttonClicked) {
//             // Once countdown is over, show content and start processes
//             setShowContent(true);
//             startRecording();
//             playRecording();
//         }
//     }, [countdown, showContent, buttonClicked]);

//     const startRecording = async () => {
//         const response = await fetch('http://localhost:8080/start-recording', { method: 'POST' });
//         console.log('Recording started:', await response.text());
//     };

//     const playRecording = async () => {
//         const response = await fetch('http://localhost:8080/play-recording', {method: 'GET'});
//         console.log('Recording playing', await response.text());
//     };

//     const handleStartCountdown = () => {
//         setButtonClicked(true); // Indicate the button was clicked
//         setCountdown(5); // Reinitialize countdown when "START THE COUNTDOWN" is clicked
//     };

//     return (
//         <>
//             <Navbar />
//             {!showContent ? (
//                 <div>
//                     {!buttonClicked && (
//                         <button onClick={handleStartCountdown}>START THE COUNTDOWN</button>
//                     )}
//                     {buttonClicked && <p>Countdown: {countdown}</p>}
//                 </div>
//             ) : (
//                 <div>
//                     <img src={videoStream} alt='video-feed' width="390" height="250"/>
//                     <SingleLadiesAudioPlayer autoPlay={true}/>
//                 </div>
//             )}
//         </>
//     );
// };

// export default AudioVideo;
import React, { useState, useEffect } from 'react';
import Navbar from "../Sidebar";
import SingleLadiesAudioPlayer from "./SingleLadiesAudioPlayer";

const AudioVideo = () => {
    const [showContent, setShowContent] = useState(false);
    const [countdown, setCountdown] = useState(5); // Start countdown at 5 seconds
    const [buttonClicked, setButtonClicked] = useState(false); // Track if the countdown button has been clicked
    const videoStream = "http://localhost:8080/video-feed";

    useEffect(() => {
        // Countdown logic
        if (countdown > 0 && buttonClicked) {
            setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (!showContent && buttonClicked) {
            // Once countdown is over, show content, autoplay music, and start recording automatically
            setShowContent(true);
            // Assuming startRecording and playRecording functions are designed to be called here
            startRecording(); // Start recording automatically after countdown
            playRecording(); // Start playing recording automatically after countdown
        }
    }, [countdown, showContent, buttonClicked]);

    const startRecording = async () => {
        const response = await fetch('http://localhost:8080/start-recording', { method: 'POST' });
        console.log('Recording started:', await response.text());
    };

    const playRecording = async () => {
        // Play the recording or music here. Adjust based on your actual implementation.
        const response = await fetch('http://localhost:8080/play-recording', {method: 'GET'});
        console.log('Recording playing', await response.text());
    };

    const handleStartCountdown = () => {
        setButtonClicked(true); // Indicate the button was clicked
        setCountdown(5); // Reinitialize countdown
    };

    return (
        <>
            <Navbar />
            {!showContent ? (
                <div>
                    {!buttonClicked && (
                        <button onClick={handleStartCountdown}>START THE COUNTDOWN</button>
                    )}
                    {buttonClicked && <p>Countdown: {countdown}</p>}
                </div>
            ) : (
                <div>
                    <img src={videoStream} alt='video-feed' width="390" height="250"/>
                    <SingleLadiesAudioPlayer autoPlay={true}/>
                </div>
            )}
        </>
    );
};

export default AudioVideo;
