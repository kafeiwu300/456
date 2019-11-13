import { IStory } from "./interfaces";
import React from "react";
import { Modal, Icon, Collapse, Descriptions } from "antd";
import StoryForm from "./StoryForm";
import store from "./store";
import ActionType from "./ActionType";

const StoryCard: React.FC<{story: IStory}> = ({story}) => {
  let storyForm: any = undefined;

  const removeStory = () => {
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

  const modifyStory = () => {
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
    <Collapse expandIconPosition='right'>
      <Collapse.Panel key={1} header={story.title} extra={
        <>
          <Icon type="edit" onClick={modifyStory}/>
          <Icon type="delete" onClick={removeStory}/>
        </>
      }>
        <Descriptions size='small'>
          <Descriptions.Item label='描述' span={3}>{story.description}</Descriptions.Item>
          <Descriptions.Item label='状态'>{story.state}</Descriptions.Item>
          <Descriptions.Item label='故事点'>{story.storyPoint}</Descriptions.Item>
          <Descriptions.Item label='估算工时'>{story.estimatedHours}</Descriptions.Item>
        </Descriptions>
      </Collapse.Panel>
    </Collapse>
  );
}

export default StoryCard;