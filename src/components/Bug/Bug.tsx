import React, { CSSProperties, useContext } from "react";
import { IBug } from "./interfaces";
import { Row, Col } from "antd";
import BugCardContainer from "./BugCardContainer";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { BugState, KanbanState } from "../../enums";
import ProjectContext from "../../common/contexts/ProjectContext";

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
      <div style={{ textAlign: "center" }}>
        <div style={{ width: "100%", textAlign: "left", margin: "0 auto" }}>
          <Row>
            {
              project.bugStatusList!.map((value: KanbanState) => (
                <Col span={4}>
                  <div style={headerStyle}>{value}</div>
                </Col>
              ))
            }
          </Row>
          <Row style={{ marginBottom: "8px" }}>
            {
              project.bugStatusList!.map((value: BugState, index: number) => (
                <Col span={4}>
                  <BugCardContainer canAddBug={index === 0} bugs={bugs} status={value} />
                </Col>
              ))
            }
          </Row>
        </div>
      </div>
    </DndProvider>
  );
};

export default Bug;
