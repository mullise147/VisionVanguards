import React, { useState, useRef, useEffect } from 'react';
import singleLadies from './single_ladies.wav';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom


const SingleLadiesAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, []);

    // Function to handle audio end event
    const handleAudioEnd = () => {
      setIsPlaying(false); // Set playing status to false
      navigate("/score"); // Navigate to the score page
    };

  const progressBarStyle = {
    flex: 1, // Allows the progress bar to fill the available space
    height: '6px',
    borderRadius: '10px',
    WebkitAppearance: 'none',
    appearance: 'none',
    backgroundColor: '#e0e0e0',
  };

  const progressBarValueStyle = `
    progress[value]::-webkit-progress-value {
      background-color: #4caf50;
      border-radius: 5px;
      transition: width 0.2s ease-in-out;
    }
  `;

  const progressBarBackgroundStyle = `
    progress[value]::-webkit-progress-bar {
      background-color: #f0f0f0;
      border-radius: 5px;
    }
  `;

  const playerStyle = {
    width: '100%',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '40px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    maxWidth: '1100px',
  };

  const progressContainerStyle = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '10px', // Add some space between the progress bar and the time display
  };

  const timeDisplayStyle = {
    fontSize: '1.5rem',
    color: '#666',
    textAlign: 'center'
  };

  return (
    <div style={{ padding: '20px', boxSizing: 'border-box' }}>
      <style>{progressBarValueStyle + progressBarBackgroundStyle}</style>
      <audio ref={audioRef} src={singleLadies} preload="metadata" autoPlay={isPlaying} onEnded={handleAudioEnd}/> 
       {/* onEnded={() => setIsPlaying(false)} */}
      <div style={playerStyle}>
        <div style={progressContainerStyle}>
          <progress style={progressBarStyle} value={currentTime} max={duration}></progress>
          <div style={timeDisplayStyle}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleLadiesAudioPlayer;