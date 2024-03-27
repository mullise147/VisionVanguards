import React from 'react';
import singleLadies from './single_ladies.mp3';

const SingleLadiesAudioPlayer = () => {
  // Styles for the audio control wrapper to adjust its size
  const audioWrapperStyle = {
    width: '80%', // Make the audio player wide as necessary, adjust as needed
    maxWidth: '600px', // Maximum width of the player
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px', // Space between elements
  };

  // Styles for the audio element to make it fill the wrapper
  const audioStyle = {
    width: '100%', // Make the audio element fill its container
  };

  return (
    <div>
      <div style={audioWrapperStyle}>
        <div>🎶 Single Ladies - Beyoncé 🎶</div>
        <audio controls style={audioStyle} autoPlay = {true}>
          <source src={singleLadies} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default SingleLadiesAudioPlayer;
