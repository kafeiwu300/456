import React, { CSSProperties } from 'react';
import { Icon, Modal } from 'antd';
import { useDrop } from 'react-dnd';
import { IEpicInfo, IIteration, IStoryInEpic, IDragObject } from './interfaces';
import StoryCard from './StoryCard';
import { store } from '../store';

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

  // const addTask = () => {
  //   Modal.confirm({
  //     okText: '保存',
  //     cancelText: '取消',
  //     icon: <></>,
  //     width: 600,
  //     content: <TaskForm wrappedComponentRef={(form: any) => taskForm = form} task={{id: guid(), state}}/>,
  //     centered: true,
  //     onOk: () => {
  //       if (taskForm && taskForm.props) {
  //         store.dispatch({
  //           type: ActionType.addTask,
  //           story,
  //           task: {
  //             ...taskForm.props.form.getFieldsValue(),
  //             state
  //           },
  //           state
  //         });
  //       }
  //     }
  //   });
  // };

  return (
    <div style={outerStyle} ref={drop}>
      {
        iteration.stories
          .filter((story: IStoryInEpic) => story.epicId === epic.id)
          .map((story: IStoryInEpic) => <StoryCard story={story}/>)
      }
      <div style={addStoryStyle}><Icon type="plus"/>添加故事</div>
    </div>
  );
};

export default StoryCardContainer;