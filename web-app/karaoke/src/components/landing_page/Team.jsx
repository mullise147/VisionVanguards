import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import "../../assets/styles/team.css"; 
import Pic from "../../assets/images/profilepic.png";
import Athulya from "../../assets/images/athulya.png";  

const { Meta } = Card;

class Team extends Component {
  render() {
    return (
      <div className="team-container">
        <div className="landing-page-top">
          <h2>MEET THE TEAM</h2>
          <Row gutter={[32, 32]} justify="space-around">
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={Athulya} />}
              >
                <Meta
                  title={<span className="card-title">Athulya Ganesh</span>}
                  description={<span className="card-description">Athulya Ganesh, an international student from India and Dubai, UAE, is pursuing a combined BSc and M.Eng in Computer Science, set to graduate in May 2024. With co-ops at Nokia, FOX Sports, Infinera, and the iCDCU Lab, Athulya aims to specialize in healthcare-tech product management in the future.</span>}
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={Pic} />}
              >
                <Meta
                  title={<span className="card-title">Rob Kelly</span>}
                  description={<span className="card-description">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual 
                  form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</span>}
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={Pic} />}
              >
                <Meta
                  title={<span className="card-title">Stephanie Mullins</span>}
                  description={<span className="card-description">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual
                  form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</span>}
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={Pic} />}
              >
                <Meta
                  title={<span className="card-title">Dr. Jillian Aurisano</span>}
                  description={<span className="card-description">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual
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
