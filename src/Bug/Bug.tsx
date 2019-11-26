import React, { CSSProperties } from "react";
import { IBug } from "./interfaces";
import { Row, Col, Icon, Modal } from "antd";
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import BugCard from "./BugCard";
import { connect } from "react-redux";
import { IState } from "../interfaces";
import BugCardContainer from "./BugCardContainer";

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
      <Row style={{ marginBottom: "8px" }} gutter={8}>
        <Col span={4}>
          <BugCardContainer bugs={bugs} state="to-be-acknowledged" />
        </Col>
        <Col span={4}>
          <BugCardContainer bugs={bugs} state="to-be-fixed" />
        </Col>
        <Col span={4}>
          <BugCardContainer bugs={bugs} state="fixing" />
        </Col>
        <Col span={4}>
          <BugCardContainer bugs={bugs} state="to-be-accepted" />
        </Col>
        <Col span={4}>
          <BugCardContainer bugs={bugs} state="accepted" />
        </Col>
        <Col span={4}>
          <BugCardContainer bugs={bugs} state="closed" />
        </Col>
      </Row>
    </DndProvider>
  );
};

export default connect((state: IState) => ({ bugs: state.bugData }))(Bug);
