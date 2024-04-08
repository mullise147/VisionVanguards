import React, { Component } from 'react';
import LandingPage from './landing_page/LandingPage';
import About from './landing_page/About';
import Team from "./landing_page/Team"; 
import "../assets/styles/landing_page.css"; 
import "../index.css"; 
import Footer from "./Footer.jsx"; 
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAbout: false
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const aboutComponent = document.getElementById('about');
    if (aboutComponent) {
      const aboutPosition = aboutComponent.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (aboutPosition < windowHeight * 0.75) {
        this.setState({ showAbout: true });
      } else {
        this.setState({ showAbout: false });
      }
    }
  }

  render() {
    const { showAbout } = this.state;
    
    const aboutStyle = {
      backgroundPosition: showAbout ? 'center 33%' : 'center 0%'
    };

    const teamStyle = {
      backgroundPosition: 'center 66%' // or calculate this dynamically
    };

    return (
      <div className="landing-container">
        <LandingPage />
        <div style={aboutStyle}><About /></div>
        <div style={teamStyle}><Team /></div>
      </div>
    );
  }
}

export default Landing;

