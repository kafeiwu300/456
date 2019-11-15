import React, { CSSProperties } from 'react';
import { Icon, Modal } from 'antd';
import { useDrop } from 'react-dnd';
import { IEpic, IIteration, IStoryInIteration, IEpicInfo, IIterationWithStory, IStoryInEpic } from './interfaces';
import StoryCard from '../Kanban/StoryCard';

const StoryCardContainer: React.FC<{epic: IEpicInfo, iteration: IIterationWithStory}> = ({epic, iteration}) => {
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

  // const [, drop] = useDrop({
  //   accept: 'taskCard',
  //   canDrop: (item: IDragObject) => {
  //     return !!story.tasks.find((task: ITask) => item.task === task);
  //   },
  //   drop: (item: IDragObject) => {
  //     store.dispatch({
  //       type: ActionType.moveTask,
  //       story,
  //       task: item.task,
  //       state
  //     })
  //   },
  //   collect: monitor => ({
  //     isOver: monitor.isOver(),
  //     canDrop: monitor.canDrop()
  //   })
  // });

  let taskForm: any = undefined;

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
    // <div ref={drop} style={outerStyle}>
    //   {story.tasks.filter(
    //     (task: ITask) => task.state === state
    //   ).map(
    //     (task: ITask) => <TaskCard story={story} task={task}/>
    //   )}
    //   {state === State.todo ? (
    //     <div style={addTaskStyle} onClick={addTask}>
    //       <span style={{cursor: 'pointer'}}><Icon type="plus" />添加任务</span>
    //     </div>
    //   ) : <></>}
    // </div>
    <div style={outerStyle}>
      {
        iteration.stories
          .filter((story: IStoryInEpic) => story.epicId === epic.id)
          .map((story: IStoryInEpic) => <div style={{margin: '4px 0'}}><StoryCard story={story}/></div>)
      }
      <div style={addStoryStyle}><Icon type="plus"/>添加故事</div>
    </div>
  );
};

export default StoryCardContainer;