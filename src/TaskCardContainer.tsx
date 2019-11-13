import React, { CSSProperties } from 'react';
import { Icon, Modal } from 'antd';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';
import { IStory, IDragObject, ITask } from './interfaces';
import store, { guid } from './store';
import ActionType from './ActionType';
import TaskForm from './TaskForm';

const TaskCardContainer: React.FC<{
  state: 'todo' | 'doing' | 'done',
  story: IStory
}> = ({state, story}) => {
  const outerStyle = {
    backgroundColor: '#eee',
    padding: '8px',
    borderRadius: '4px'
  }

  const addTaskStyle: CSSProperties = {
    margin: '4px', 
    padding: '16px',
    borderRadius: '4px',
    backgroundColor: 'white',
    textAlign: "center"
  }

  const [, drop] = useDrop({
    accept: 'taskCard',
    canDrop: (item: IDragObject) => {
      return !!story.tasks.find((task: ITask) => item.task === task);
    },
    drop: (item: IDragObject) => {
      store.dispatch({
        type: ActionType.moveTask,
        story,
        task: item.task,
        state
      })
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  let taskForm: any = undefined;

  const addTask = () => {
    Modal.confirm({
      okText: '保存',
      cancelText: '取消',
      icon: <></>,
      width: 600,
      content: <TaskForm wrappedComponentRef={(form: any) => taskForm = form} task={{state}}/>,
      centered: true,
      onOk: () => {
        if (taskForm && taskForm.props) {
          store.dispatch({
            type: ActionType.addTask,
            story,
            task: {
              id: guid(),
              ...taskForm.props.form.getFieldsValue(),
              state
            },
            state
          });
        }
      }
    });
  };

  return (
    <div ref={drop} style={outerStyle}>
      {story.tasks.filter(
        (task: ITask) => task.state === state
      ).map(
        (task: ITask) => <TaskCard story={story} task={task}/>
      )}
      <div style={addTaskStyle} onClick={addTask}>
        <span style={{cursor: 'pointer'}}><Icon type="plus" />添加任务</span>
      </div>
    </div>
  );
};

export default TaskCardContainer;