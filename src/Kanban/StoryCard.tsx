import { IStory, IStoryInfo } from "./interfaces";
import React from "react";
import { Modal, Collapse, Descriptions, Tag, Badge, Avatar, Button } from "antd";
import StoryForm from "./StoryForm";
import store from "./store";
import { ActionType } from "./enums";

const StoryCard: React.FC<{story: IStoryInfo}> = ({story}) => {
  let storyForm: any = undefined;

  const removeStory = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    Modal.confirm({
      content: '确定要删除这个故事吗？',
      okText: '确定',
      cancelText: '取消',
      width:  600,
      onOk: () => {
        store.dispatch({
          type: ActionType.removeStory,
          story
        });
      }
    })
  }

  const modifyStory = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    Modal.confirm({
      okText: '保存',
      cancelText: '取消',
      icon: <></>,
      width: 600,
      centered: true,
      content: <StoryForm wrappedComponentRef={(form: any) => storyForm = form} story={story}/>,
      onOk: () => {
        if (storyForm && storyForm.props) {
          const s: IStory = {
            id: story.id,
            ...storyForm.props.form.getFieldsValue()
          };
          store.dispatch({
            type: ActionType.modifyStory,
            story: s
          })
        }
      }
    })
  }

  return (
    <Collapse>
      <Collapse.Panel key={story.id!} header={story.title} showArrow={false} extra={
        <>
          <Button onClick={modifyStory} type='link' size='small' icon='edit' ghost/>
          <Button onClick={removeStory} type='link' size='small' icon='delete' ghost/>
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
  );
}

export default StoryCard;