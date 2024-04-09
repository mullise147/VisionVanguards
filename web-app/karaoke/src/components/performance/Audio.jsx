import React, { useState, useEffect, useRef } from 'react';
import Navbar from "../Sidebar";
import SingleLadiesAudioPlayer from "./SingleLadiesAudioPlayer";
import AudioWave from './AudioWave';
import { useNavigate } from 'react-router-dom';
import WaveForm from './Waveform';
import "../../assets/styles/audio.css"; 
import "../../assets/styles/font.css"; 
import cardpic from "../../assets/images/card.png"; 

const Audio = () => {
    const [showContent, setShowContent] = useState(false);
    const [countdown, setCountdown] = useState(10); // Start countdown at 10 seconds
    const [buttonClicked, setButtonClicked] = useState(false); // Track if the countdown button has been clicked
    const navigate = useNavigate();
    const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
    const [lyrics, setLyrics] = useState([]);
    const [lyricsTimings, setLyricsTimings] = useState([]);
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



    // Define the event handler for button click
  const handleButtonClick = () => {
    navigate('/score'); // Navigate to /score page
  };

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

    const startRecording = async () => {
        const response = await fetch('http://localhost:8080/start-recording', { method: 'POST' });
        console.log('Recording started:', await response.text());
    };
    const stopRecording = async () => {
        const response = await fetch('http://localhost:8080/stop-recording', {method: 'POST'});
        console.log("End", await response.text()); 
    }; 

    const getNextLyric = () => {
        return lyrics[currentLyricIndex + 1];
    }; 

    const handleStartCountdown = () => {
        if (!buttonClicked) {
            setButtonClicked(true);
            setCountdown(10);
        }
    };


    // Styles
    const previewTextStyle = {
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgba(128, 128, 128, 0.5)', // Semi-transparent background for better visibility
        padding: '5px 20px',
        borderRadius: '100px',
        position: 'absolute',
        // top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2, // Ensure it's above the video feed
        fontFamily: "Rubik Mono One, monospace",
        fontWeight: "400",
        fontStyle: "normal"
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
            <div style={{alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                {!showContent && (
                    <>
                     <AudioWave style={{ pointerEvents: 'none' }} />
                     <h2 style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center', fontFamily: "Rubik Mono One, monospace", 
                    fontWeight: '400',fontStyle: 'normal'}}>Start your Performance</h2>
                        {!buttonClicked && (
                            <div style={{ textAlign: 'center', marginTop: '0px' }}>
                                <button className="blue-button"
                                    onClick={handleStartCountdown}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
                                >
                                    START →
                                </button>
                            </div>
                        )}
                        {buttonClicked && (
                            <div style={{  alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                                <AudioWave style={{ pointerEvents: 'none' }} />
                            <div style={{videoContainerStyle}}>
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
                                        fontFamily: "Rubik Mono One, monospace",
                                        fontWeight: "400",
                                        fontStyle: "normal"
                                        
                                    }}>
                                        {countdown}
                                    </div>
                                )}
                            </div>
                            </div>
                        )}
                    </>
                )}
                {showContent && (
<>
<h2 style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center',  fontFamily: "Rubik Mono One, monospace" }}>🎶 Single Ladies - Beyoncé 🎶</h2>
    
    {/* Wide Box for Lyrics */}
    <div style={{
        textAlign: 'center',
        padding: '10px',
        width: '75%', // Adjusted for a wider box
        height: '300px', // Height adjusts to content
        boxSizing: 'border-box',
        borderRadius: '45px',
        color: 'white',
        fontFamily: 'Cousine, monospace',
        border: 'transparent',
        backgroundImage: `url(${cardpic})`, // Set the background image
        backgroundSize: 'cover', // Cover the entire card
        backgroundPosition: 'center', // Center the background image
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        margin: '0 auto 20px auto', // Centered and with margin below
    }}>
        <h3 style={{ fontSize: '2.2em', fontFamily: 'Rubik Mono One'}}>LYRICS</h3>
        <h3 style={{
            margin: '0', // Remove default margin
            fontSize: getFontSizeForLyric(lyrics[currentLyricIndex]), // Dynamic font size
            fontWeight: '500', // Medium font weight for importance
            paddingTop: '35px'
        }}>
            {lyrics[currentLyricIndex]}
        </h3>
        <h3 style={{
            margin: '0', // Remove default margin
            fontSize: '1.9em', // Smaller font size for the next lyric
            fontStyle: 'italic', // Italicize for a preview effect
            color: '#666', // Lighter color for the preview
            paddingTop: '50px',
            paddingBottom: "45px"
        }}>
            {getNextLyric()}
        </h3>
    </div>


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
          maxWidth: '10%', // Maximum width of the box
          margin: '0 auto', // Center the box if it's smaller than the max-width
  }}>
      <p className="floatAnimation">{currentWord}</p>
  </p>
</div>

{/* Audio Player and Quit Button */}
<div style={{
    display: 'flex',
    alignItems: 'center', // Vertically align items
    width: '75%', // Match the width of the lyrics box
    margin: '20px auto 40px auto', // Center it horizontally and add some margin at the bottom
    padding: '0 10px', // Slightly reduce padding
    boxSizing: 'border-box', // Include padding in the width calculation
}}>
    <div style={{
        flex: 1, // Allows the container to expand, filling the space
        maxWidth: 'calc(100% - 150px)', // Adjust this value to ensure alignment and provide space for the quit button
        marginRight: '20px', // Adds space between the audio player and the quit button
    }}>
        <SingleLadiesAudioPlayer 
            onAudioEnd={() => navigate("/score")} 
            style={{ 
                width: '100%', // Ensures the audio player stretches to fill its container
            }} 
        />

    </div>
    <button
        className="blue-button"
        style={{
            backgroundColor: 'rgb(199,0,0)',
            whiteSpace: 'nowrap', // Prevents text inside the button from wrapping
            marginLeft: '50px'
           
        }}
        onClick={handleButtonClick}
    >
        QUIT →
    </button>
    
      <div
        style={{
          height: 0,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        <WaveForm></WaveForm>

        </div>
</div>

</>

                )}
            </div>
        </div>
    );
};

export default Audio;
