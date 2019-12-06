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
    padding: "12px 16px"
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
    textAlign: "center"
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <div style={{ width: "80%", textAlign: "left", margin: "0 auto" }}>
          <Row>
            <Col span={4}>
              <div style={headerStyle}>待确认</div>
            </Col>
            <Col span={4}>
              <div style={headerStyle}>待修复</div>
            </Col>
            <Col span={4}>
              <div style={headerStyle}>修复中</div>
            </Col>
            <Col span={4}>
              <div style={headerStyle}>待验收</div>
            </Col>
            <Col span={4}>
              <div style={headerStyle}>已验收</div>
            </Col>
            <Col span={4}>
              <div style={headerStyle}>已关闭</div>
            </Col>
          </Row>
          <Row style={{ marginBottom: "8px" }}>
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
        </div>
      </div>
    </DndProvider>
  );
};

export default connect((state: IState) => ({ bugs: state.bugData }))(Bug);
