import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import "../../assets/styles/team.css"; 
import Pic from "../../assets/images/profilepic.png";
import Athulya from "../../assets/images/athulya.png";  
import Steph from "../../assets/images/steph.png"; 
import "../../assets/styles/font.css"; 

const { Meta } = Card;

class Team extends Component {
  render() {
    return (
      <div className="team-container">
        <div className="landing-page-top">
          <h2 className = "rubik-mono">MEET THE TEAM</h2>
          <Row gutter={[24, 24]} justify="space-around">

          <Col xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                style={{ width: 260 }}
                cover={<img alt="example" src={Athulya} />}
              >
                <Meta
                  title={<span  className = "rubik-mono">Athulya</span>}
                  description={<span className="cousine-regular">Athulya Ganesh, an international student from India and Dubai, UAE, is pursuing a combined BSc and M.Eng in Computer Science, set to graduate in May 2024. With co-ops at Nokia, FOX Sports, Infinera, and the iCDCU Lab, Athulya aims to specialize in healthcare-tech product management in the future.</span>}
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                style={{ width: 260 }}
                cover={<img alt="example" src={Pic} />}
              >
                <Meta
                  title={<span  className = "rubik-mono">Rob</span>}
                  description={<span className="cousine-regular">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual 
                  form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</span>}
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                style={{ width: 260 }}
                cover={<img alt="example" src={Steph} />}
              >
                <Meta
                  title={<span  className = "rubik-mono">Stephanie</span>}
                  description={<span className="cousine-regular">Stephanie Mullins is pursuing a BSc in Computer Science and is set to graduate at the end of April 2024. Stephanie has an interest in Computer Vision technology and is set to continue her passion in a full-time capacity at Radiance Technologies post-graduation.</span>}
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                style={{ width: 260 }}
                cover={<img alt="example" src={Pic} />}
              >
                <Meta
                  title={<span className = "rubik-mono">Dr. Aurisano</span>}
                  description={<span className="cousine-regular">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual
                  form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</span>}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Team;