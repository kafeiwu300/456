import { IBug, IDragObject } from "./interfaces";
import React, { CSSProperties } from "react";
import { Modal, Icon, Button, Popover } from "antd";
import { store } from "../store";
import { useDrag } from "react-dnd";
import BugForm from "./BugForm";

const BugCard: React.FC<{ bug: IBug }> = ({ bug }) => {
  const removeBug = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    Modal.confirm({
      title: "删除缺陷",
      content: "确定要删除这个缺陷吗？",
      okText: "确定",
      cancelText: "取消",
      width: 600,
      icon: <Icon type="delete" />,
      onOk: () => {
        store.dispatch({
          type: "bug-removeBug",
          bug
        });
      }
    });
  };

  let bugForm: JSX.Element;

  const modifyBug = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    Modal.confirm({
      title: "修改缺陷信息",
      content: (
        <BugForm
          bug={bug}
          wrappedComponentRef={(form: JSX.Element) => (bugForm = form)}
        />
      ),
      okText: "确定",
      cancelText: "取消",
      width: 600,
      icon: <Icon type="edit" />,
      onOk: () => {
        store.dispatch({
          type: "bug-modifyBug",
          bug: { id: bug.id, ...bugForm.props.form.getFieldsValue() }
        });
      }
    });
  };

  const dragObject: IDragObject = {
    type: "bugCard",
    bug
  };

  const [, drag] = useDrag({
    item: dragObject,
    collect: monitor => {
      return { isDragging: monitor.isDragging() };
    }
  });

  const bugCardStyle: CSSProperties = {
    border: "1px solid #ddd",
    borderRadius: "2px",
    padding: "10px",
    width: "50%",
    margin: "0 0 5px",
    boxShadow: "1px 1px 1px 0 rgb(200,200,200,0.5)",
    float: "left",
    height: "95px",
    position: "relative"
  };

  const wrapStyle: CSSProperties = {
    textOverflow: "ellipsis",
    overflow: "hidden",
    wordWrap: "break-word",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical"
  };

  const basePriorityStyle: CSSProperties = {
    height: "4px",
    // border: "1px solid #eee",
    borderRadius: "5px",
    boxShadow: "-1px -1px 1px 0 rgb(100,100,100,0.5) inset",
    position: "absolute",
    bottom: "5px",
    left: "8px",
    right: "8px"
  };

  const veryHighStyle: CSSProperties = {
    backgroundColor: "#F22",
    ...basePriorityStyle
  };

  const highStyle: CSSProperties = {
    backgroundColor: "#FF8C00",
    ...basePriorityStyle
  };

  const middleStyle: CSSProperties = {
    backgroundColor: "#3CB371",
    ...basePriorityStyle
  };

  const lowStyle: CSSProperties = {
    backgroundColor: "#A9A9A9",
    ...basePriorityStyle
  };

  const setPriorityStyle = () => {
    switch (bug.level) {
      case "very high":
        return veryHighStyle;
      case "high":
        return highStyle;
      case "middle":
        return middleStyle;
      case "low":
        return lowStyle;
      default:
        return lowStyle;
    }
  };

  const popoverContent = (
    <div>
      {/* <Descriptions size="small" column={1} colon={false}>
        <Descriptions.Item label="">{bug.description}</Descriptions.Item>
        <Descriptions.Item label="状态">{bug.state}</Descriptions.Item>{" "}
        <Descriptions.Item label="负责人">{bug.leader}</Descriptions.Item>
        <Descriptions.Item label="优先级">{bug.level}</Descriptions.Item>
      </Descriptions> */}
      <p>{bug.description}</p>
      <p>状态 {bug.state}</p>
      <p>负责人 {bug.leader}</p>
      <p>优先级 {bug.level}</p>
      <Button
        onClick={modifyBug}
        size="small"
        icon="edit"
        style={{ border: "none", backgroundColor: "transparent" }}
      />
      <Button
        onClick={removeBug}
        size="small"
        icon="delete"
        style={{ border: "none", backgroundColor: "transparent" }}
      />
    </div>
  );

  return (
    <Popover
      content={popoverContent}
      title={bug.title}
      placement="right"
      trigger="click"
      // overlayStyle={{ width: "200px" }}
    >
      <div ref={drag} style={bugCardStyle}>
        <div style={wrapStyle}>{bug.title}</div>
        <div style={setPriorityStyle()} />
      </div>
    </Popover>
  );
};

export default BugCard;
