import { IBug, IDragObject } from "./interfaces";
import React, { useState } from "react";
import { Modal, Icon, Collapse, Button, Descriptions } from "antd";
import { store } from "../store";
import { useDrag } from "react-dnd";

const BugCard: React.FC<{ bug: IBug }> = ({ bug }) => {
  let storyForm: any = undefined;

  const [ghost, setGhost] = useState<boolean>(true);

  const removeStory = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    Modal.confirm({
      title: "删除故事",
      content: "确定要删除这个故事吗？",
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
                onClick={removeStory}
                size="small"
                icon="edit"
                ghost={ghost}
                style={{ border: "none", backgroundColor: "transparent" }}
              />
              <Button
                onClick={removeStory}
                size="small"
                icon="delete"
                ghost={ghost}
                style={{ border: "none", backgroundColor: "transparent" }}
              />
            </>
          }
        >
          {/* {bug.priority ? (
            <Tag color="#fa8c16" title="优先级">
              {story.priority}
            </Tag>
          ) : (
            <></>
          )}
          {story.state ? (
            <Tag color="#2db7f5" title="状态">
              {story.state}
            </Tag>
          ) : (
            <></>
          )}
          {story.leader ? (
            <span title={story.leader}>
              <Avatar shape="square" icon="user" />
            </span>
          ) : (
            <></>
          )}
          {story.storyPoint ? (
            <Badge
              title="故事点"
              count={story.storyPoint}
              style={{ backgroundColor: "#bfbfbf" }}
              offset={story.leader ? [8, 0] : [0, 0]}
            />
          ) : (
            <></>
          )} */}
          <Descriptions size="small" colon={false}>
            <Descriptions.Item label="" span={4}>
              {bug.description}
            </Descriptions.Item>
            {/* <Descriptions.Item label='状态' span={4}>{story.state}</Descriptions.Item> */}
            {/* <Descriptions.Item label='故事点' span={4}>{story.storyPoint}</Descriptions.Item> */}
            {/* <Descriptions.Item label='估算工时' span={4}>{story.estimatedHours}</Descriptions.Item> */}
            {/* <Descriptions.Item label='负责人' span={4}>{story.leader}</Descriptions.Item> */}
            {/* <Descriptions.Item label='优先级' span={4}>{story.priority}</Descriptions.Item> */}
          </Descriptions>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

export default BugCard;
