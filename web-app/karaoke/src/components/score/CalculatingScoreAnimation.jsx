import React from 'react';

const CalculatingScore = () => {
  // Inline CSS styles
  const styles = {
    calculatingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    },
    calculatingMessage: {
      fontSize: '24px',
      marginBottom: '20px',
      textAlign: 'center',
    },
    loader: {
      border: '6px solid #f3f3f3', // Light grey
      borderTop: '6px solid #3498db', // Blue
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      animation: 'spin 2s linear infinite',
    },
    // The @keyframes definition cannot be inlined into React style objects directly.
    // You would typically include this global style in your index.html or a global CSS file.
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  };

  return (
    <div style={styles.calculatingContainer}>
      <div style={styles.calculatingMessage}>Great Job! Calculating your final score....</div>
      <div style={styles.loader}></div> 
    </div>
  );
};

export default CalculatingScore;
