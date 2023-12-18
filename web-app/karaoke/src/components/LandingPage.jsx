import React, { Component } from 'react';
import "../../src/index.css"; 

class LandingPage extends Component {
  render() {
    return (
      <div className="landing-page-top">
        <p>The Vision Vanguards present...</p>
        <h1>[ SIGHTSTEP ]</h1>
        <br />
        <h2>Unleash your inner star: Dance, Sing, and Shine with Karaoke Magic!</h2>
        <br />
        <button className="blue-button">
          GET STARTED &rarr; 
        </button>
      </div>
    );
  }
}

export default LandingPage;
