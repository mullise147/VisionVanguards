import React, { Component } from 'react';
import LandingPage from './landing_page/LandingPage';
import About from './landing_page/About';
import "../assets/styles/landing_page.css"; 
import "../index.css"; 

class Landing extends Component {
  render() {
    return (
      <div className = "landing-container">
        <LandingPage />
        <About />
      </div>
    );
  }
}

export default Landing;

