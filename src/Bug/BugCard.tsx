import { IBug, IDragObject } from "./interfaces";
import React, { useState } from "react";
import { Modal, Icon, Collapse, Button, Descriptions, Tag, Avatar } from "antd";
import { store } from "../store";
import { useDrag } from "react-dnd";
import BugForm from "./BugForm";

const BugCard: React.FC<{ bug: IBug }> = ({ bug }) => {
  const [ghost, setGhost] = useState<boolean>(true);

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

  let bugForm: any | undefined;

  const modifyBug = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    Modal.confirm({
      title: "修改缺陷信息",
      content: (
        <BugForm
          bug={bug}
          wrappedComponentRef={(form: any) => (bugForm = form)}
        />
      ),
      okText: "确定",
      cancelText: "取消",
      width: 600,
      icon: <Icon type="edit" />,
      onOk: () => {
        console.log(bugForm.props.form.getFieldsValue());
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

  return (
    <div
      onMouseOverCapture={() => setGhost(false)}
      onMouseOutCapture={() => setGhost(true)}
      ref={drag}
    >
      <Collapse>
        <Collapse.Panel
          style={{ wordBreak: "break-word" }}
          key={bug.id!}
          header={bug.title}
          showArrow={false}
          extra={
            <>
              <Button
                onClick={modifyBug}
                size="small"
                icon="edit"
                ghost={ghost}
                style={{ border: "none", backgroundColor: "transparent" }}
              />
              <Button
                onClick={removeBug}
                size="small"
                icon="delete"
                ghost={ghost}
                style={{ border: "none", backgroundColor: "transparent" }}
              />
            </>
          }
        >
          {bug.level ? (
            <Tag color="#fa8c16" title="优先级">
              {bug.level}
            </Tag>
          ) : (
            <></>
          )}
          {bug.state ? (
            <Tag color="#2db7f5" title="状态">
              {bug.state}
            </Tag>
          ) : (
            <></>
          )}
          {bug.leader ? (
            <span title={bug.leader}>
              <Avatar shape="square" icon="user" />
            </span>
          ) : (
            <></>
          )}
          <Descriptions size="small" column={4} colon={false}>
            <Descriptions.Item label="" span={4}>
              {bug.description}
            </Descriptions.Item>
            <Descriptions.Item label="状态" span={4}>
              {bug.state}
            </Descriptions.Item>{" "}
            <Descriptions.Item label="负责人" span={4}>
              {bug.leader}
            </Descriptions.Item>
            <Descriptions.Item label="优先级" span={4}>
              {bug.level}
            </Descriptions.Item>
          </Descriptions>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

export default BugCard;
