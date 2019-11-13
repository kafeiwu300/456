import { IStory } from "./interfaces";
import React from "react";
import { Modal, Icon } from "antd";
import StoryForm from "./StoryForm";
import store from "./store";
import ActionType from "./ActionType";

const StoryCard: React.FC<{story: IStory}> = ({story}) => {
  const outerStyle = {
    backgroundColor: '#eee',
    padding: '16px',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex'
  }

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

  const showInfo = () => {
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
    <div style={outerStyle}>
      <div style={{
        display: 'inline-block', 
        fontSize: '14px', 
        fontWeight: 'bold', 
        flex: 'auto',
        cursor: 'pointer'
      }} onClick={showInfo}>
        {story.title}
      </div>
      <div style={{float: 'right', flex: 'initial'}}>
        <Icon type="delete" onClick={removeStory}/>
      </div>
    </div>
  );
}

export default StoryCard;