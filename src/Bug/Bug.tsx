import React, { CSSProperties } from "react";
import { IBug } from "./interfaces";
import { Row, Col, Icon, Modal } from "antd";
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import BugCard from "./BugCard";
import { connect } from "react-redux";
import { IState } from "../interfaces";

const Bug: React.FC<{ bugs: IBug[] }> = ({ bugs }) => {
  const outerStyle = {
    // backgroundColor: '#e8e8e8',
    backgroundColor: "#fff",
    padding: "12px 16px",
    borderRadius: "4px"
  };

  const addStoryStyle: CSSProperties = {
    ...outerStyle,
    textAlign: "center",
    border: "1px solid #d9d9d9"
  };

  const headerStyle: CSSProperties = {
    ...outerStyle,
    fontSize: "18px",
    fontWeight: "bold",
    borderRadius: "4px"
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Row gutter={[8, 16]}>
        <Col span={4}>
          <div style={headerStyle}>To be acknowledged</div>
        </Col>
        <Col span={4}>
          <div style={headerStyle}>To be fixed</div>
        </Col>
        <Col span={4}>
          <div style={headerStyle}>Fixing</div>
        </Col>
        <Col span={4}>
          <div style={headerStyle}>To be accepted</div>
        </Col>
        <Col span={4}>
          <div style={headerStyle}>Accepted</div>
        </Col>
        <Col span={4}>
          <div style={headerStyle}>Closed</div>
        </Col>
      </Row>
      {bugs.map((bug: IBug) => {
        return (
          <Row style={{ marginBottom: "8px" }} gutter={8}>
            <Col span={4}>
              <BugCard bug={bug} />
            </Col>
            <Col span={4}>
              <BugCard bug={bug} />
            </Col>
            <Col span={4}>
              <BugCard bug={bug} />
            </Col>
            <Col span={4}>
              <BugCard bug={bug} />
            </Col>
            <Col span={4}>
              <BugCard bug={bug} />
            </Col>
            <Col span={4}>
              <BugCard bug={bug} />
            </Col>
          </Row>
        );
      })}
    </DndProvider>
  );
};

export default Bug;
