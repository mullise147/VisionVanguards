import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import "../../assets/styles/team.css"; 
import Athulya from "../../assets/images/athulya.png";  
import Steph from "../../assets/images/steph.png"; 
import Aurisano from "../../assets/images/aurisano.png"; 
import Rob from "../../assets/images/rob2.png";
import "../../assets/styles/font.css"; 
import pic from "../../assets/images/card_picture.png"; 


const { Meta } = Card;

class Team extends Component {
  render() {
    return (
      <div className="team-container">
        <div className="landing-page-top">
          <h2 className="rubik-mono">MEET THE TEAM</h2>
          <Row gutter={[24, 24]} justify="space-around">

            <Col xs={24} sm={12} md={8} lg={6}>
              <Card
                className="team-card"
                style={{ width: 260, 
                  backgroundImage: `url(${pic})`, // Set the background image
                  backgroundSize: 'cover', // Cover the entire card
                  backgroundPosition: 'center' // Center the background image
                           }}
                cover={<img alt="Athulya" src={Athulya} style={{width: 260, height: 200}}/>}
              >
                <div className="custom-card-container">
                  <Meta
                    title={<span className="rubik-mono" style = {{color: 'white'}}>Athulya</span>}
                    description={<span className="cousine-regular custom-card-description"  style = {{color: 'white'}}>Athulya Ganesh, an international student from India and Dubai, UAE, is pursuing a combined BSc and M.Eng in Computer Science, set to graduate in April 2024. With co-ops at Nokia, FOX Sports, Infinera, and the iCDCU Lab, Athulya aims to specialize in healthcare-tech product management in the future.</span>}
                  />
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8} lg={6}>
              <Card
                className="team-card"
                style={{ width: 260,
                  backgroundImage: `url(${pic})`, // Set the background image
                  backgroundSize: 'cover', // Cover the entire card
                  backgroundPosition: 'center' // Center the background image
                  ,borderColor: 'transparent',
                  borderBottom: 'transparent'

                }}
                cover={<img alt="Rob" src={Rob} style={{width: 260, height: 200}}/>}
              >
                <div className="custom-card-container">
                  <Meta
                    title={<span className="rubik-mono"  style = {{color: 'white'}}>Rob</span>}
                    description={<span className="cousine-regular custom-card-description"  style = {{color: 'white'}}>Rob Kelly is a fifth-year BSc Computer Science student at the University of Cincinnati graduating in April 2024. Rob possesses a solid background in Java and Kotlin app development. Aspiring to be a Software Developer at FOX Sports post-graduation, his interests span Android and iOS app development and computer networking.</span>}
                  />
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8} lg={6}>
              <Card
                className="team-card"
                style={{ width: 260,
                  backgroundImage: `url(${pic})`, // Set the background image
                  backgroundSize: 'cover', // Cover the entire card
                  backgroundPosition: 'center' // Center the background image
                  ,borderColor: 'transparent'

                }}
                cover={<img alt="Stephanie" src={Steph} style={{width: 260, height: 200}}/>}
              >
                <div className="custom-card-container">
                  <Meta
                    title={<span className="rubik-mono"  style = {{color: 'white'}}>Stephanie</span>}
                    description={<span className="cousine-regular custom-card-description"  style = {{color: 'white'}}>Stephanie Mullins is pursuing a BSc in Computer Science and is set to graduate at the end of April 2024. Stephanie has an interest in Computer Vision technology using tools like OpenCV and Python and is set to continue her passion in a full-time capacity at Radiance Technologies post-graduation.</span>}
                  />
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8} lg={6}>
              <Card
                className="team-card"
                style={{ width: 260,
                  backgroundImage: `url(${pic})`, // Set the background image
                  backgroundSize: 'cover', // Cover the entire card
                  backgroundPosition: 'center' // Center the background image
                  ,borderColor: 'transparent', 
                }}
                cover={<img alt="Dr. Aurisano" src={Aurisano} style={{width: 260, height: 200}}/>}
              >
                <div className="custom-card-container">
                  <Meta
                    title={<span className="rubik-mono"  style = {{color: 'white'}}>Dr. Aurisano</span>}
                    description={<span className="cousine-regular custom-card-description"  style = {{color: 'white'}}>Jillian Aurisano, an Assistant Professor at the University of Cincinnati 
                  and setting up DaVINCI lab, plays a pivotal role as a project advisor. With an academic background that includes a Bachelor's degree in Biology and a PhD from the University of Illinois at 
                  Chicago, Dr. Aurisano brings a wealth of knowledge and experience to her role.</span>}
                  />
                </div>
              </Card>
            </Col>

          </Row>
        </div>
      </div>
    );
  }
}

export default Team;
