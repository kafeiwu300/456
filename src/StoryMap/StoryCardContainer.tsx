import React, { CSSProperties } from 'react';
import { Icon, Modal } from 'antd';
import { useDrop } from 'react-dnd';
import { IEpicInfo, IIteration, IStoryInEpic, IDragObject } from './interfaces';
import StoryCard from './StoryCard';
import { store } from '../store';
import { guid } from '../Kanban/store';
import StoryForm from '../Kanban/StoryForm';

const StoryCardContainer: React.FC<{epic: IEpicInfo, iteration: IIteration}> = ({epic, iteration}) => {
  const outerStyle = {
    // backgroundColor: '#e8e8e8',
    backgroundColor: '#FFFFFF',
    padding: '4px 8px',
    borderRadius: '4px'
  }

  const addStoryStyle: CSSProperties = {
    padding: '12px 16px',
    borderRadius: '4px',
    backgroundColor: 'white',
    textAlign: "center",
    border: '1px solid #d9d9d9'
  }

  let storyForm: any = undefined;

  const [, drop] = useDrop({
    accept: 'storyCard',
    canDrop: (item: IDragObject) => {
      return true;
    },
    drop: (item: IDragObject) => {
      store.dispatch({
        type: 'storyMap-moveStory',
        story: {...item.story, epicId: epic.id},
        iteration
      })
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const addStory = () => {
    Modal.confirm({
      title: '添加用户故事',
      okText: '保存',
      cancelText: '取消',
      icon: <Icon type="plus-circle"/>,
      width: 600,
      content: <StoryForm wrappedComponentRef={(form: any) => storyForm = form} story={{id: guid()}}/>,
      centered: true,
      onOk: () => {
        if (storyForm && storyForm.props) {
          store.dispatch({
            type: 'storyMap-addStory',
            story: {
              ...storyForm.props.story,
              epicId: epic.id,
              ...storyForm.props.form.getFieldsValue()
            },
            iteration
          });
        }
      }
    });
  };

  return (
    <div style={outerStyle} ref={drop}>
      {
        iteration.stories
          .filter((story: IStoryInEpic) => story.epicId === epic.id)
          .map((story: IStoryInEpic) => <StoryCard story={story}/>)
      }
      <div style={addStoryStyle} onClick={addStory}><Icon type="plus"/>添加故事</div>
    </div>
  );
};

export default StoryCardContainer;