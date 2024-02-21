import React, { Component } from 'react';
import LandingPage from './landing_page/LandingPage';
import About from './landing_page/About';
import Team from "./landing_page/Team"; 
import "../assets/styles/landing_page.css"; 
import "../index.css"; 

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
    return (
      <div className="landing-container">
        <LandingPage />
        {/* {this.state.showAbout && <About /> && <Team />} */}
        <About></About>
        <Team></Team>
      </div>
    );
  }
}

export default Landing;

