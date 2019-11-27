import React, { useState } from "react";
import { Modal, Collapse, Descriptions, Tag, Badge, Avatar, Button, Icon } from "antd";
import { store } from "../store";
import StoryForm from "../Kanban/StoryForm";
import { IDragObject, IStoryInEpic } from "./interfaces";
import { useDrag } from "react-dnd";

const StoryCard: React.FC<{story: IStoryInEpic}> = ({story}) => {
  let storyForm: any = undefined;

  const [ghost, setGhost] = useState<boolean>(true);

  const dragObject: IDragObject = {
    type: 'storyCard',
    story
  };

  const [, drag] = useDrag({
    item: dragObject,
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const removeStory = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    Modal.confirm({
      title: '删除用户故事',
      content: '确定要删除这个故事吗？',
      okText: '确定',
      cancelText: '取消',
      width:  600,
      icon: <Icon type="delete"/>,
      onOk: () => {
        store.dispatch({
          type: 'storyMap-removeStory',
          story
        });
      }
    })
  }

  const modifyStory = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    Modal.confirm({
      title: '修改用户故事',
      okText: '保存',
      cancelText: '取消',
      icon: <Icon type="edit"/>,
      width: 600,
      centered: true,
      content: <StoryForm wrappedComponentRef={(form: any) => storyForm = form} story={story}/>,
      onOk: () => {
        if (storyForm && storyForm.props) {
          const s: IStoryInEpic = {
            id: story.id,
            epicId: story.epicId,
            ...storyForm.props.form.getFieldsValue()
          };
          store.dispatch({
            type: 'storyMap-modifyStory',
            story: s
          })
        }
      }
    })
  }

  return (
    <div ref={drag} style={{margin: '4px 0'}} onMouseOverCapture={() => setGhost(false)} onMouseOutCapture={() => setGhost(true)}>
      <Collapse>
        <Collapse.Panel key={story.id!} header={story.title} style={{wordBreak: 'break-word'}} showArrow={false} extra={
          <>
            <Button onClick={modifyStory} size='small' icon='edit' ghost={ghost} style={{border: 'none', backgroundColor: 'transparent'}}/>
            <Button onClick={removeStory} size='small' icon='delete' ghost={ghost} style={{border: 'none', backgroundColor: 'transparent'}}/>
          </>
        }>
          {story.priority ? <Tag color='#fa8c16' title="优先级">{story.priority}</Tag> : <></>}
          {story.state ? <Tag color='#2db7f5' title="状态">{story.state}</Tag> : <></>}
          {story.leader ? <span title={story.leader}><Avatar shape="square" icon="user"/></span> : <></>}
          {story.storyPoint ? <Badge title="故事点" count={story.storyPoint} style={{backgroundColor: '#bfbfbf'}} offset={story.leader ? [8, 0] : [0, 0]}/> : <></>}
          <Descriptions size='small' colon={false}>
            <Descriptions.Item label='' span={4}>{story.description}</Descriptions.Item>
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
}

export default StoryCard;