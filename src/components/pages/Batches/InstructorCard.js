import React from "react";
import { Row, Col, Avatar, Image, Card, Space } from "antd";

function InstructorCard(props) {


  console.log("The Ins props", props);

  const date1 = new Date(props.info[0]?.BatchStartDate);
  const date2 = new Date(props.info[0]?.BatchEndDate);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  console.log("The props", props);

  return (
    <>
      <Row justify="space-around" align="middle">
        <Col span={6} style={{ paddingRight: "5px" }}>
          <h3>Batch Details:</h3>
          <Row>
            <Col span={12}>
              <h6>Name:</h6>
            </Col>
            <Col span={12}>
              <h6>{props.info[0]?.BatchName}</h6>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <h6>Course:</h6>
            </Col>
            <Col span={12}>
              <h6>{props.info[0]?.Course}</h6>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <h6>Start Date:</h6>
            </Col>
            <Col span={12}>
              <h6>{props.info[0]?.BatchStartDate}</h6>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <h6>End Date:</h6>
            </Col>
            <Col span={12}>
              <h6>{props.info[0]?.BatchEndDate}</h6>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <h6>Duration:</h6>
            </Col>
            <Col span={12}>
              <h6>{diffDays}</h6>
            </Col>
          </Row>
        </Col>
        <Col span={9}>
          <Card>
            <h3>Instructor Details</h3>
            <div>
              <Space align="center">
                <Avatar
                  size={100}
                  src={
                    <Image
                      src="https://ca.slack-edge.com/T596V2PB7-U01EPQV7RB8-f24b6bf8a10e-512"
                      style={{
                        width: 100,
                      }}
                    />
                  }
                />
                <div>
                  <Row>
                    <h6>Instructor Name: {props.info[0]?.InstructorName}</h6>
                    <h6>Instructor Email: {props.info[0]?.InsEmail}</h6>
                  </Row>
                </div>
              </Space>
            </div>
          </Card>
        </Col>
        <Col span={9}>
          <Card>
            <h3>Co-ordinator Details</h3>
            <div>
              <Space align="center">
                <Avatar
                  size={100}
                  src={
                    <Image
                      src="https://ca.slack-edge.com/T596V2PB7-U028855V0JV-7d612bdbda55-512"
                      style={{
                        width: 100,
                      }}
                    />
                  }
                />
                <div>
                  <Row>
                    <h6>Co-ordinator Name: {props.info[0]?.CoordinatorName}</h6>
                    <h6>Co-ordinator Email: {props.info[0]?.CorEmail}</h6>
                  </Row>
                </div>
              </Space>
            </div>
          </Card>
        </Col>
      </Row>
    </>

  );
}

export default InstructorCard;
