import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import "../../assets/styles/about.css"; 
import "../../index.css"; 
import Pic from "../../assets/images/profilepic.png"; 

const { Meta } = Card;

class About extends Component {
  render() {
    return (
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
        <h2>MEET THE TEAM</h2>
        <Row gutter={[110, 110]}>

          <Col span={6}>
          <Card
          hoverable
          style={{ width: 320 }}
          cover={<img alt="example" src={Pic} />}
          >
        <Meta
        title={<span className="card-title">Athulya Ganesh</span>}
        description={<span className="card-description">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</span>}
        />
        </Card>
        </Col>

          <Col span={6}>
             <Card
          hoverable
          style={{ width: 320 }}
          cover={<img alt="example" src={Pic} />}
          >
        <Meta
        title={<span className="card-title">Rob Kelly</span>}
        description={<span className="card-description">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</span>}
        />
        </Card>
          </Col>

          <Col span={6}>
 <Card
          hoverable
          style={{ width: 320 }}
          cover={<img alt="example" src={Pic} />}
          >
        <Meta
        title={<span className="card-title">Stephanie Mullins</span>}
        description={<span className="card-description">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</span>}
        />
        </Card>
          </Col>
          <Col span={6}>
          <Card
          hoverable
          style={{ width: 320 }}
          cover={<img alt="example" src={Pic} />}
          >
        <Meta
        title={<span className="card-title">Dr. Jilian Aurisano</span>}
        description={<span className="card-description">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</span>}
        />
        </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default About;
