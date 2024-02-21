// import React, { Component } from 'react';
// import { Card, Row, Col } from 'antd';
// import "../../assets/styles/about.css"; 
// import "../../index.css"; 
// import Pic from "../../assets/images/profilepic.png"; 

// const { Meta } = Card;

// class About extends Component {
//   render() {
//     return (
//       <div className="landing-page-top">
//         <h2>ABOUT</h2>
//         <p className="about-paragraph">
//           Immerse yourself in the world of music with SightStep, a cutting-edge computer vision application.
//           Transform any space into your private dance floor and karaoke stage.
//           SightStep listens to your favorite karaoke songs, tracks your movements, and guides you through dance routines.
//           Sing along effortlessly as the lyrics sync with your performance.
//           Elevate your karaoke experience with SightStep's fusion of computer vision, music, and dance.
//           Get ready to step into a new realm of entertainment!
//         </p>
//       </div>
//     );
//   }
// }

// export default About;
import React, { Component } from 'react';
import "../../assets/styles/about.css"; 

class About extends Component {
  render() {
    return (
      <div className="about-container">
        <div className="landing-page-top">
          <h2>ABOUT</h2>
          <p className="about-paragraph">
            Immerse yourself in the world of music with SightStep, a cutting-edge computer vision application.
            Transform any space into your private dance floor and karaoke stage.
            SightStep listens to your favorite karaoke songs, tracks your movements, and guides you through dance routines.
            Sing along effortlessly as the lyrics sync with your performance.
            Elevate your karaoke experience with SightStep's fusion of computer vision, music, and dance.
            Get ready to step into a new realm of entertainment!
          </p>
        </div>
      </div>
    );
  }
}

export default About;

