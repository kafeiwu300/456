import { BugState } from "../enums";
import { IBug, IDragObject } from "./interfaces";
import { useDrop } from "react-dnd";
import { store } from "../store";
import React, { CSSProperties } from "react";
import BugCard from "./BugCard";
import { Icon, Modal } from "antd";
import BugForm from "./BugForm";
import { guid } from "../Kanban/store";

const BugCardContainer: React.FC<{
  state: BugState;
  bugs: IBug[];
}> = ({ state, bugs }) => {
  const outerStyle = {
    // backgroundColor: '#e8e8e8',
    backgroundColor: "#FFFFFF",
    padding: "4px 8px",
    borderRadius: "4px"
  };
  const addTaskStyle: CSSProperties = {
    padding: "12px 16px",
    borderRadius: "4px",
    backgroundColor: "white",
    textAlign: "center",
    border: "1px solid #d9d9d9",
    margin: "4px 0"
  };
  const [, drop] = useDrop({
    accept: "bugCard",
    drop: (item: IDragObject) => {
      store.dispatch({
        type: "bug-moveBug",
        bug: item.bug,
        state
      });
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  let bugForm: any = undefined;
  const addBug = () => {
    Modal.confirm({
      title: "添加缺陷",
      okText: "保存",
      cancelText: "取消",
      icon: <Icon type="plus-circle" />,
      width: 600,
      content: (
        <BugForm
          wrappedComponentRef={(form: any) => (bugForm = form)}
          bug={{ id: guid(), state }}
        />
      ),
      centered: true,
      onOk: () => {
        if (bugForm && bugForm.props) {
          console.log(bugForm.props);
          store.dispatch({
            type: "bug-addBug",
            bug: { ...bugForm.props.bug, ...bugForm.props.form.getFieldsValue() },
            state
          });
        }
      }
    });
  };
  return (
    <div ref={drop} style={outerStyle}>
      {(() => {
        const list = bugs
          .filter((bug: IBug) => bug.state === state)
          .map((bug: IBug) => (
            <BugCard bug={bug} />
          ));
        return list.length === 0 && state !== 'to-be-acknowledged' ? <div style={{textAlign: 'center', minHeight: '50px', lineHeight: '50px', color: '#aaa'}}>无缺陷</div> : list;
      })()}
      {state === "to-be-acknowledged" ? (
        <div style={addTaskStyle} onClick={addBug}>
          <span style={{ cursor: "pointer" }}>
            <Icon type="plus" />
            添加缺陷
          </span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BugCardContainer;
