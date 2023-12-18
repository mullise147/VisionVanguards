import React, { Component } from 'react';
import "../../src/index.css"; 

class About extends Component {
  render() {
    const paragraphStyle = {
      textAlign: 'center',
      padding: '60px',
    };

    return (
      <div className="landing-page-top">
        <h1>ABOUT</h1>
        <p style={paragraphStyle}>
          Immerse yourself in the world of music with SightStep, a cutting-edge computer vision application. 
          Transform any space into your private dance floor and karaoke stage. 
          SightStep listens to your favorite karaoke songs, tracks your movements, and guides you through dance routines.
          Sing along effortlessly as the lyrics sync with your performance. 
          Elevate your karaoke experience with SightStep's fusion of computer vision, music, and dance. 
          Get ready to step into a new realm of entertainment!
        </p>
        <h1>MEET THE TEAM</h1>
      </div>
    );
  }
}

export default About;
