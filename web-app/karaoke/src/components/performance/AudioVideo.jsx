import React, { useState, useEffect, useRef } from 'react';
import Navbar from "../Sidebar";
import SingleLadiesAudioPlayer from "./SingleLadiesAudioPlayer";
import AudioWave from './AudioWave';
import WaveForm from './Waveform';
import { useReward } from 'react-rewards';
import { useNavigate } from 'react-router-dom';
import "../../assets/styles/comment.css";
import "../../assets/styles/audio.css"; 
import pose0 from "../../assets/images/pose/0.png"; 
import pose1 from "../../assets/images/pose/1.png"; 
import pose2 from "../../assets/images/pose/2.png"; 
import pose3 from "../../assets/images/pose/3.png"; 
import pose4 from "../../assets/images/pose/4.png"; 
import pose5 from "../../assets/images/pose/5.png"; 
import pose6 from "../../assets/images/pose/6.png"; 
import pose7 from "../../assets/images/pose/7.png"; 
import pose8 from "../../assets/images/pose/8.png"; 
import pose9 from "../../assets/images/pose/9.png"; 
import pose10 from "../../assets/images/pose/10.png"; 
import pose11 from "../../assets/images/pose/11.png"; 
import pose12 from "../../assets/images/pose/12.png"; 
import pose13 from "../../assets/images/pose/13.png"; 
import pose14 from "../../assets/images/pose/14.png"; 
import pose15 from "../../assets/images/pose/15.png"; 
import pose16 from "../../assets/images/pose/16.png"; 
import pose17 from "../../assets/images/pose/17.png"; 
import pose18 from "../../assets/images/pose/18.png";
import pose19 from "../../assets/images/pose/19.png";


const AudioVideo = () => {
    const [lyrics, setLyrics] = useState([]);
    const [lyricsTimings, setLyricsTimings] = useState([]);
    const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
    const [showContent, setShowContent] = useState(false);
    const [countdown, setCountdown] = useState(10); // Start countdown at 10 seconds
    const [buttonClicked, setButtonClicked] = useState(false); // Track if the countdown button has been clicked
    const videoStream = "http://localhost:8080/video-feed";
    const navigate = useNavigate(); 
    const { reward, isAnimating } = useReward('rewardId', 'confetti');

    const [currentPoseIndex, setCurrentPoseIndex] = useState(0);
    const [poseTimings, setPoseTimings] = useState([]);
    
    const [currentWord, setCurrentWord] = useState('');
    const wordsOfEncouragement = [
      'lit!',
      'dope!',
      'slick!',
      'boss!',
      'fresh!',
      'smooth!',
      'fly!',
      'sharp!',
      'swag!',
      'cool!',
      'groovy!',
      'snazzy!',
      'jazzy!',
      'rad!',
      'tight!',
      'sick!',
      'stellar!',
      'epic!',
      'fire!',
      'awesome!',
      'crisp!',
      'killer!',
      'dashing!',
      'vibing!',
      'bomb!',
      'amazing!',
      'crazy!',
      'fire!', 
      'amazing!', 
      'keep going!'
    ];

    const poses = {
      0: pose0,
      1: pose1,
      2: pose2,
      3: pose3, 
      4: pose4,
      5: pose5,
      6: pose6, 
      7: pose7,
      8: pose8,
      9: pose9,
      10: pose10,
      11: pose11,
      12: pose12,
      13: pose13,
      14: pose14, 
      15: pose15,
      16: pose16,
      17: pose17,
      18: pose18,
      19: pose19
    };


const colors = 
[
    "#FFD600",
    "#C6FF00",
    "#795548",
    "#03A9F4",
    "#AA00FF",
    "#9C27B0",
    "#009688",
    "#9E9E9E",
    "#7BDCB5",
    "#6200EA",
    "#00B0FF",
    "#FF6D00",
    "#00A6ED",
    "#673AB7",
    "#76FF03",
    "#00BCD4",
    "#3F51B5",
    "#FF5722",
    "#FF5733",
    "#FF5252",
    "#FF1744",
    "#D500F9",
    "#4CAF50",
    "#F50057",
    "#ff6ac1",
    "#00E5FF",
    "#FFB400",
    "#F78DA7",
    "#64DD17",
    "#FF9800",
    "#FFEB3B",
    "#9900EF",
    "#2196F3",
    "#FFC107",
    "#8BC34A",
    "#607D8B",
    "#1DE9B6",
    "#E91E63",
    "#304FFE",
    "#F6511D", 
    "volcano", 
    "lime", 
    "gold", 
    "cyan" 
]

const colorIndex = Math.floor(Math.random() * colors.length); // Select a random index for the color
const color = colors[colorIndex]; // Get the color at the randomly selected index

    useEffect(() => {
        // Function to update to a random word
        const updateWord = () => {
            const randomIndex = Math.floor(Math.random() * wordsOfEncouragement.length);
            setCurrentWord(wordsOfEncouragement[randomIndex]);
        };

        // Immediately update to a random word on mount
        updateWord();

        // Set an interval to update the word every 7 seconds
        const intervalId = setInterval(updateWord, 7000);

        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array means this effect runs once on mount


    useEffect(() => {
        if (countdown > 0 && buttonClicked) {
            setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (countdown <= 0 && buttonClicked && !showContent) {
            setShowContent(true);
            startRecording(); // Start recording automatically after countdown
        }
    }, [countdown, buttonClicked]);

    useEffect(() => {
      const fetchPoseTimings = async () => {
          const response = await fetch('http://localhost:8080/pose-timings');
          const text = await response.text();
          const timings = text.split('\n').map(t => parseInt(t, 10));
          setPoseTimings(timings);
      };
  
      fetchPoseTimings();
  }, []);

  useEffect(() => {
    if (showContent && poseTimings.length > 0) {
        const timeouts = poseTimings.map((time, index) => {
            return setTimeout(() => {
                setCurrentPoseIndex(index);
            }, time * 1000); // Convert to milliseconds
        });

        // Clear timeouts when the component unmounts or the timings change
        return () => {
            timeouts.forEach(clearTimeout);
        };
    }
}, [showContent, poseTimings]);


    useEffect(() => {
        fetchLyrics();
        fetchLyricsTimings();
    }, []);

    const fetchLyrics = async () => {
        const response = await fetch('http://localhost:8080/lyrics');
        const data = await response.text();
        setLyrics(data.split('\n'));
    };

    const fetchLyricsTimings = async () => {
        const response = await fetch('http://localhost:8080/lyrics-timings');
        const data = await response.text();
        setLyricsTimings(data.split('\n').map(time => parseInt(time, 10)));
    };

    const getFontSizeForLyric = (lyric) => {
        if (lyric.length > 80) return '1.7em'; // Small font size for long lyrics
        if (lyric.length > 40) return '1.9em'; // Medium font size for medium length lyrics
        return '2.3em'; // Large font size for short lyrics
      };
      
      
    useEffect(() => {
        if (showContent && lyricsTimings.length > 0 && lyrics.length > 0) {
          let timeoutIds = [];
      
          // Schedule an update for each lyric change
          lyricsTimings.forEach((time, index) => {
            let delay = time * 1000; // convert seconds to milliseconds
            // delay += ; // Add 3 seconds to each timing as per your instruction
      
            if (index === 0 && countdown > 0) {
              delay -= (10 - countdown) * 1000;
            }
      
            const timeoutId = setTimeout(() => setCurrentLyricIndex(index), delay);
            timeoutIds.push(timeoutId);
          });
      
          // Clear the timeouts on component unmount or when the lyrics/timings change
          return () => timeoutIds.forEach(clearTimeout);
        }
      }, [showContent, lyricsTimings, lyrics, countdown]);

    const startRecording = async () => {
        const response = await fetch('http://localhost:8080/start-recording', { method: 'POST' });
        console.log('Recording started:', await response.text());
    };

    const stopRecording = async () => {
        const response = await fetch('http://localhost:8080/stop-recording', {method: 'POST'});
        console.log("End", await response.text()); 
    }


    const handleButtonClick = () => {
        stopRecording(); 
        // navigate("/score")
        navigate('/score', { state: { from: "/audio-video" } });

    }
    const handleStartCountdown = () => {
      reward
        if (!buttonClicked) {
            setButtonClicked(true);
            setCountdown(10);
        }
    };

    const getNextLyric = () => {
        return lyrics[currentLyricIndex + 1];
    };

    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh', // Adjusted for overall view
        gap: '20px', // Add space between elements
    };

    const lyricsAndPosesContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '400px', // Match video container height for alignment
    };
    
     // Styles
     const previewTextStyle = {
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgba(128, 128, 128, 0.5)', // Semi-transparent background for better visibility
        padding: '5px 20px',
        borderRadius: '100px',
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2, // Ensure it's above the video feed
    };

    const videoContainerStyle = {
        position: 'relative',
        border: '1px solid #e1e1e1',
        borderRadius: '15px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        width: '600px',
        height: '400px',
        margin: '40px auto 0 auto', // Center the container horizontally
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };
    
    return (
        <div className = "background">
        <Navbar />
        <div style={{alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
            {!showContent && (
              
                <>
                    <AudioWave style={{ pointerEvents: 'none', flex: '1', alignSelf: 'center' }} />

                    <h3 style={{marginTop: '20px', marginBottom: '20px', textAlign: 'center'}}>Start your Performance</h3>
                    {!buttonClicked && (
                        <div style={{textAlign: 'center', marginTop: '0px'}}>
                            <button
                                className="blue-button"
                                disabled={isAnimating}
                                onClick={handleStartCountdown}
                                onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
                                onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
                            >
                                START →             
                            </button>
                        </div>
                    )}
                    {buttonClicked && (
                        <div style={{alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
                            <div style={videoContainerStyle}>
                                <p style={previewTextStyle}>PREVIEW</p>
                                
                                {countdown > 0 && (
                                    <div style={{
                                        position: 'absolute',
                                        color: 'white',
                                        fontSize: '200px',
                                        top: '55%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        backgroundColor: 'rgba(128, 128, 128, 0.5)',
                                        padding: '5px 20px',
                                        borderRadius: '100px',
                                    }}>
                                        {countdown}
                                    </div>
                                )}
                                <img
                                    src={videoStream}
                                    alt='video-feed'
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '15px',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </>
            )}
            
            {showContent && (
  <>
    <h2 style={{  marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>🎶 Single Ladies - Beyoncé 🎶</h2>
    <div style = {{opacity: '0.8'}}>    </div>

    
<div style={{
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 0',
  boxSizing: 'border-box', // Ensures padding and border are included in the total width
}}>
 <div style={{
  flex: '1', // This will allow each box to take up an equal amount of space
  textAlign: 'center',
  border: '3px solid #f0f0f0', // Changed to light grey for a softer look
  padding: '10px',
  marginLeft: '2%',
  marginRight: '2%', // Adjusted for spacing between the boxes
  width: '50%', // Adjust the width to account for the border and padding
  height: '300px',
  boxSizing: 'border-box', // Include the padding and border in the element's total width
  borderRadius: '15px', // Smooth rounded corners for a modern look
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Added a soft shadow for depth
  backgroundColor: '#fff', // Optional: Background color for contrast
}}> 
     <h3 style = {{fontSize: '2.2em'}}>LYRICS</h3>  
    <h3 style={{
    margin: '0', // Remove default margin
    // fontSize: '1.9em', // Slightly larger font size for the current lyric
    fontSize: getFontSizeForLyric(lyrics[currentLyricIndex]), // Dynamic font size
    fontWeight: '500', // Medium font weight for importance
    paddingTop: '35px'
  }}>
   {lyrics[currentLyricIndex]}
  </h3>
  
  <h3 style={{
    margin: '0', // Remove default margin
    fontSize: '1.9em', // Smaller font size for the next lyric
    // fontSize: nextLyricFontSize,
    fontStyle: 'italic', // Italicize for a preview effect
    color: '#666', // Lighter color for the preview
    paddingTop: '50px',
    paddingBottom: "45px"
  }}>
    {getNextLyric()}
  </h3>
  </div>


  <div style={{
  flex: '1', // This will allow each box to take up an equal amount of space
  textAlign: 'center',
  border: '3px solid #f0f0f0', // Changed to light grey for a softer look
  padding: '10px',
  marginLeft: '2%',
  marginRight: '2%', // Adjusted for spacing between the boxes
  width: '50%', // Adjust the width to account for the border and padding
  height: '300px', 
  boxSizing: 'border-box', // Include the padding and border in the element's total width
  borderRadius: '15px', // Smooth rounded corners for a modern look
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Added a soft shadow for depth
  backgroundColor: '#fff', // Optional: Background color for contrast
}}>
    <h3 style = {{fontSize: '2.2em'}}>POSES</h3>
    <h3>{currentPoseIndex}</h3>
    {/* <img src={`../../assets/images/pose/${currentPoseIndex + 1}.png`} style={{ height: '220px', width: '600px' }} alt="Current Pose" /> */}
    {/* <img src = {pose0}  style={{ height: '220px', width: '600px' }} alt="Current Pose" ></img> */}
    {/* <img src={poseImage} style={{ height: '220px', width: '600px' }} alt="Current Pose" /> */}
    <img src={poses[currentPoseIndex]} style={{ height: '200px', width: '600px' }} alt="Current Pose" />

  </div>
</div>
    
    <div style={{ 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'flex-end', // Align items at their bottom edge
  marginTop: '20px',
  flexWrap: 'wrap', // Allow items to wrap as needed for responsiveness
}}>
  <img
    src={videoStream}
    alt='video-feed'
    style={{
      flex: '2',
      borderRadius: '15px',
      objectFit: 'cover',
      maxWidth: '100%',
      height: 'auto',
      width: '80px', // Specify a fixed width or adjust as needed
      marginRight: '2%',
      marginLeft: '2%',
    }}
  />

  <div style={{ 
    flex: '3', 
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'flex-end', // Align child elements to the bottom
    padding: '0 10px', 
    marginLeft: '2%', 
    marginRight: '2%',
    maxWidth: 'calc(100% - 300px - 30px)', // Account for image and margins
  }}>
  <div style={{ 
  marginTop: '10px', 
  textAlign: 'center', 
  flexGrow: '1', // Allow this container to grow and push the audio player down
  // padding: '10px 0', // Add some vertical padding
  animation: 'float 3s ease-in-out infinite', // Add a floating animation
}}>
  <p style={{
          padding: '10px 20px', // Add padding inside the box
          borderRadius: '5px', // Small radius for a rectangular look
          background: color, // Use random color from colors array
          color: 'white',
          fontSize: '40px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          textTransform: 'uppercase', // for white text in uppercase
          maxWidth: '25%', // Maximum width of the box
          margin: '0 auto', // Center the box if it's smaller than the max-width
  }}>
      <p className="floatAnimation">{currentWord}</p>
  </p>
</div>
    <div style={{paddingTop: '5px'}}>
    <SingleLadiesAudioPlayer onAudioEnd={() => navigate('/score', { state: { from: "/audio-video" } })} />

    </div>
  </div>

  <div style={{ 
    flex: '1', 
    padding: '0 30px', 
    marginLeft: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end', // Ensure the button is aligned to the bottom
  }}>
    <button 
      className="blue-button" 
      style={{ 
        width: '100%', 
        backgroundColor: 'rgb(199,0,0)', 
        marginTop: 'auto', // Push the button to the bottom if there's vertical space
      }} 
      onClick={handleButtonClick}
    >
      QUIT →
    </button>
    <WaveForm></WaveForm>
  </div>
</div>

  </>
)}

        </div>

    </div>
    );
};

export default AudioVideo;