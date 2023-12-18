import React, { Component } from 'react';
import "../../src/index.css"; 
import Footer from "../components/Footer"; 
import About from "../components/About"; 

class LandingPage extends Component {
  render() {
    return (
     <> <div className="landing-page-top">
          <p>The Vision Vanguards present...</p>
          <h1>[ SIGHTSTEP ]</h1>
          <br />
          <p>Unleash your inner star: Dance, Sing, and Shine with Karaoke Magic!</p>
          <br />
          <button className="blue-button" onClick={() => (window.location.href = "/account")}>
            GET STARTED &rarr;
          </button>
        </div>
        <About/>
        <Footer/>
        </>
    );
  }
}

export default LandingPage;


