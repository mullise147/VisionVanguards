import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../../assets/styles/landing_page.css";
import "../../index.css";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      fullText: "SIGHTSTEP",
    };
  }

  componentDidMount() {
    this.typeText();
  }

  typeText = () => {
    const { fullText, text } = this.state;
    if (text.length < fullText.length) {
      this.setState({
        text: fullText.substring(0, text.length + 1),
      });

      setTimeout(this.typeText, 300); // Slowed down the typing speed
    }
  };

  render() {
    const { text } = this.state;
    return (
      <div className="landing-page-top">
        <p>The Vision Vanguards present...</p>
        <h1>[ {text} ]</h1>
        <br />
        <p>Unleash your inner star: Dance, Sing, and Shine with Karaoke Magic!</p>
        <br />
        <br />
        <button className="blue-button">
          <Link to="/account" className="link-style">GET STARTED &rarr;</Link>
        </button>
      </div>
    );
  }
}

export default LandingPage;
