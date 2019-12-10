import React, { CSSProperties } from "react";
import { IBug } from "./interfaces";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import { IState } from "../interfaces";
import BugCardContainer from "./BugCardContainer";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

const Bug: React.FC<{ bugs: IBug[] }> = ({ bugs }) => {
  const outerStyle = {
    // backgroundColor: '#e8e8e8',
    backgroundColor: "#fff",
    padding: "12px 16px"
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
        <div style={{ width: "100%", textAlign: "left", margin: "0 auto" }}>
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
              {/* <BugCardContainer bugs={bugs} status="to-be-acknowledged" /> */}
              <BugCardContainer bugs={bugs} status="待确认" />
            </Col>
            <Col span={4}>
              {/* <BugCardContainer bugs={bugs} status="to-be-fixed" /> */}
              <BugCardContainer bugs={bugs} status="待修复" />
            </Col>
            <Col span={4}>
              {/* <BugCardContainer bugs={bugs} status="fixing" /> */}
              <BugCardContainer bugs={bugs} status="修复中" />
            </Col>
            <Col span={4}>
              {/* <BugCardContainer bugs={bugs} status="to-be-accepted" /> */}
              <BugCardContainer bugs={bugs} status="待验收" />
            </Col>
            <Col span={4}>
              {/* <BugCardContainer bugs={bugs} status="accepted" /> */}
              <BugCardContainer bugs={bugs} status="已验收" />
            </Col>
            <Col span={4}>
              {/* <BugCardContainer bugs={bugs} status="closed" /> */}
              <BugCardContainer bugs={bugs} status="已关闭" />
            </Col>
          </Row>
        </div>
      </div>
    </DndProvider>
  );
};

// redux
export default connect((state: IState) => ({ bugs: state.bugData }))(Bug);
