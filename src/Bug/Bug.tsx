import React, { CSSProperties, useContext } from "react";
import { IBug } from "./interfaces";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import { IState } from "../interfaces";
import BugCardContainer from "./BugCardContainer";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { BugState, KanbanState } from "../enums";
import ProjectContext from "../common/contexts/ProjectContext";

const Bug: React.FC<{ bugs: IBug[] }> = ({ bugs }) => {
  const project = useContext(ProjectContext);

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
            {
              project.bugStatusList!.map((value: KanbanState) => (
                <Col span={4}>
                  <div style={headerStyle}>{value}</div>
                </Col>
              ))
            }
            {/* <Col span={4}>
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
            </Col> */}
          </Row>
          <Row style={{ marginBottom: "8px" }}>
            {
              project.bugStatusList!.map((value: BugState, index: number) => (
                <Col span={4}>
                  <BugCardContainer canAddBug={index === 0} bugs={bugs} status={value} />
                </Col>    
              ))
            }
            {/* <Col span={4}>
              <BugCardContainer bugs={bugs} status="to-be-acknowledged" />
              <BugCardContainer canAddBug={true} bugs={bugs} status="待确认" />
            </Col>
            <Col span={4}>
              <BugCardContainer bugs={bugs} status="to-be-fixed" />
              <BugCardContainer canAddBug={false} bugs={bugs} status="待修复" />
            </Col>
            <Col span={4}>
              <BugCardContainer bugs={bugs} status="fixing" />
              <BugCardContainer canAddBug={false} bugs={bugs} status="修复中" />
            </Col>
            <Col span={4}>
              <BugCardContainer bugs={bugs} status="to-be-accepted" />
              <BugCardContainer canAddBug={false} bugs={bugs} status="待验收" />
            </Col>
            <Col span={4}>
              <BugCardContainer bugs={bugs} status="accepted" />
              <BugCardContainer canAddBug={false} bugs={bugs} status="已验收" />
            </Col>
            <Col span={4}>
              <BugCardContainer bugs={bugs} status="closed" />
              <BugCardContainer canAddBug={false} bugs={bugs} status="已关闭" />
            </Col> */}
          </Row>
        </div>
      </div>
    </DndProvider>
  );
};

// redux
export default connect((state: IState) => ({ bugs: state.bugData }))(Bug);
