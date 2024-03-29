import React, { useState, useEffect, useRef } from 'react';
import Navbar from "../Sidebar";
import SingleLadiesAudioPlayer from "./SingleLadiesAudioPlayer";
import AudioWave from './AudioWave';
import { useNavigate } from 'react-router-dom';

const AudioVideo = () => {
    const [showContent, setShowContent] = useState(false);
    const [countdown, setCountdown] = useState(10); // Start countdown at 10 seconds
    const [buttonClicked, setButtonClicked] = useState(false); // Track if the countdown button has been clicked
    const videoStream = "http://localhost:8080/video-feed";
    const navigate = useNavigate(); 


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
    }


    const handleButtonClick = () => {
        stopRecording(); 
        navigate("/score")
    }
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
        <>
            <Navbar />
            <div style={{alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                {!showContent && (
                    <>
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
                    <h3 style={{  marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>🎶 Single Ladies - Beyoncé 🎶</h3>
                    <div style={{  alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                    <AudioWave style={{ pointerEvents: 'none' }} />
                            <div style={videoContainerStyle}>
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
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 -10px', paddingTop: '40px' }}>
                            <div style={{ flex: '5', padding: '0 10px' }}>
                                    <SingleLadiesAudioPlayer onAudioEnd={() => navigate("/score")} />
                            </div>
                            <div style={{ flex: '1', padding: '0 30px' }}>
                                <button className="blue-button" style={{ width: '100%', backgroundColor: 'rgb(199,0,0)' }} onClick={handleButtonClick}>QUIT →</button>
                            </div>
                        </div>
                            </div>
                    </>
                )}
            </div>
        </>
    );
};

export default AudioVideo;
