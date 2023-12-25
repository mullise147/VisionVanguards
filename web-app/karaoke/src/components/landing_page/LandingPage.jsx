import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import "../../assets/styles/landing_page.css"; 
import "../../index.css"; 


class LandingPage extends Component {
  render() {
    return (
        <div className="landing-page-top">
          <p>The Vision Vanguards present...</p>
          <h1>[ SIGHTSTEP ]</h1>
          <br></br>
          <p>Unleash your inner star: Dance, Sing, and Shine with Karaoke Magic!</p>
          <br></br>
          <br></br>
          <button className="blue-button" >
            <Link to="/account" className="link-style">GET STARTED &rarr;</Link>
          </button>
        </div>
    );
  }
}

export default LandingPage;


