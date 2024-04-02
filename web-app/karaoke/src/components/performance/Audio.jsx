import React, { useState, useEffect, useRef } from 'react';
import Navbar from "../Sidebar";
import SingleLadiesAudioPlayer from "./SingleLadiesAudioPlayer";
import AudioWave from './AudioWave';
import { useNavigate } from 'react-router-dom';

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
        "Keep going!", "Awesome job!", "You're doing great!", 
        "Amazing effort!", "Keep up the good work!", "You're on fire!", 
        "Fantastic!", "Unstoppable!", "Wow, impressive!", "Keep shining!", 
        "You're crushing it!", "Brilliant work!", "Superb!", "You're flying high!", 
        "Incredible!", "You got this!", "Nothing can stop you!", "Way to go!", 
        "Spectacular!", "Making progress!", "Phenomenal!", "You're a star!", 
        "Magnificent!", "Wonderful!", "You're soaring!", "You're dazzling!", 
        "Excellence personified!", "You're a champion!", "Marvelous!", "You're leading the way!", 
        "Outstanding!", "You're breaking barriers!", "Keep pushing!", "You're a genius!", "Slay!", "You're killing this!", 
        "You're a star", "Keep going!", "On fire!"
    ];


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
        <>
            <Navbar />
            <div style={{alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                {!showContent && (
                    <>
                     <AudioWave style={{ pointerEvents: 'none' }} />
                     <h3 style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>Start your Performance</h3>
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
//                     <>
//                     <h2 style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>🎶 Single Ladies - Beyoncé 🎶</h2>
                        
//                         {/* Wide Box for Lyrics */}
//                         <div style={{
//                             textAlign: 'center',
//                             border: '3px solid #f0f0f0',
//                             padding: '10px',
//                             width: '75%', // Adjusted for a wider box
//                             height: '300px', // Height adjusts to content
//                             boxSizing: 'border-box',
//                             borderRadius: '15px',
//                             boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//                             backgroundColor: '#fff',
//                             margin: '0 auto 20px auto', // Centered and with margin below
//                         }}>
//                             <h3 style={{ fontSize: '2.2em' }}>LYRICS</h3>
//                             <h3 style={{
//     margin: '0', // Remove default margin
//     // fontSize: '1.9em', // Slightly larger font size for the current lyric
//     fontSize: getFontSizeForLyric(lyrics[currentLyricIndex]), // Dynamic font size
//     fontWeight: '500', // Medium font weight for importance
//     paddingTop: '35px'
//   }}>
//                                 {lyrics[currentLyricIndex]}
//                             </h3>
//                             <h3 style={{
//     margin: '0', // Remove default margin
//     fontSize: '1.9em', // Smaller font size for the next lyric
//     // fontSize: nextLyricFontSize,
//     fontStyle: 'italic', // Italicize for a preview effect
//     color: '#666', // Lighter color for the preview
//     paddingTop: '50px',
//     paddingBottom: "45px"
//   }}>
//                                 {getNextLyric()}
//                             </h3>
//                         </div>

//                         <div style={{
//     display: 'flex',
//     alignItems: 'flex-end', // This aligns children at the bottom
//     width: '75%', // Match the width of the lyrics box above for alignment
//     margin: '0 auto', // Center align with the lyrics box
// }}>

// <div style={{
//         width: '100%', // Take the full width of the parent container
//         display: 'flex', // Use flexbox to center the content
//         justifyContent: 'center', // Center the content horizontally
//         marginBottom: '20px', // Space between comment and the next element
//     }}>
//         <div style={{
//             backgroundColor: '#4076fa',
//             color: 'white',
//             padding: '5px 20px',
//             fontSize: '2rem',
//             fontFamily: 'Trebuchet MS, cursive',
//             boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
//             borderRadius: '5px',
//         }}>
//             {currentWord}
//         </div>
//     </div>


//         <div style={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between', // This spreads out the children vertically
//         flex: '3', // Takes up 75% of the space
//         marginRight: '20px', // Spacing between the audio player and the QUIT button
//     }}>
//         <SingleLadiesAudioPlayer onAudioEnd={() => navigate("/score")} />
//     </div>
    
//     <div style={{
//         flex: '1', // Takes up 25% of the space
//         display: 'flex', // Added to allow alignment of the button
//         flexDirection: 'column', // Aligns children vertically
//         justifyContent: 'flex-end', // Pushes the button to the bottom
//     }}>
//         <button
//             className="blue-button"
//             style={{
//                 marginLeft: '60px',
//                 width: '80%',
//                 backgroundColor: 'rgb(199,0,0)',
//             }}
//             onClick={handleButtonClick}
//         >
//             QUIT →
//         </button>
//     </div>
// </div>
//                     </>

<>
<h2 style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>🎶 Single Ladies - Beyoncé 🎶</h2>
    
    {/* Wide Box for Lyrics */}
    <div style={{
        textAlign: 'center',
        border: '3px solid #f0f0f0',
        padding: '10px',
        width: '75%', // Adjusted for a wider box
        height: '300px', // Height adjusts to content
        boxSizing: 'border-box',
        borderRadius: '15px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        margin: '0 auto 20px auto', // Centered and with margin below
    }}>
        <h3 style={{ fontSize: '2.2em' }}>LYRICS</h3>
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

    {/* Current Word */}
    <div style={{
        width: '20%', // Match the width of the lyrics box above for alignment
        margin: '20px auto', // Center align with the lyrics box, with top margin
        textAlign: 'center',
    }}>
        <div style={{
            backgroundColor: '#4076fa',
            color: 'white',
            padding: '5px 30px',
            fontSize: '2rem',
            fontFamily: 'Trebuchet MS, cursive',
            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
            borderRadius: '15px',
        }}>
            {currentWord}
        </div>
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
</div>



</>

                )}
            </div>
        </>
    );
};

export default Audio;
