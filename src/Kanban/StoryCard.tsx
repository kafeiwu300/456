import { IStory } from "../interfaces";
import React from "react";
import { Modal, Icon, Collapse, Descriptions } from "antd";
import StoryForm from "./StoryForm";
import store from "./store";
import { ActionType } from "./enums";

const StoryCard: React.FC<{story: IStory}> = ({story}) => {
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
            tasks: story.tasks,
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
    <Collapse style={{backgroundColor: '#e8e8e8'}}>
      <Collapse.Panel key={story.id!} header={story.title} style={{backgroundColor: '#e8e8e8'}} extra={
        <>
          <Icon type="edit" onClick={modifyStory} style={{marginRight: '12px'}}/>
          <Icon type="delete" onClick={removeStory}/>
        </>
      } showArrow={false}>
        <Descriptions size='small' colon={false}>
          <Descriptions.Item label='描述' span={4}>{story.description}</Descriptions.Item>
          <Descriptions.Item label='状态' span={4}>{story.state}</Descriptions.Item>
          <Descriptions.Item label='故事点' span={4}>{story.storyPoint}</Descriptions.Item>
          <Descriptions.Item label='估算工时' span={4}>{story.estimatedHours}</Descriptions.Item>
          <Descriptions.Item label='负责人' span={4}>{story.leader}</Descriptions.Item>
          <Descriptions.Item label='优先级' span={4}>{story.priority}</Descriptions.Item>
        </Descriptions>
      </Collapse.Panel>
    </Collapse>
  );
}

export default StoryCard;