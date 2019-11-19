import React, { CSSProperties } from 'react';
import { Icon, Modal } from 'antd';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';
import { IStory, IDragObject, ITask } from './interfaces';
import { KanbanState } from "../enums";
import TaskForm from './TaskForm';
import { store } from '../store';
import { guid } from './store';

const TaskCardContainer: React.FC<{
  state: KanbanState,
  story: IStory
}> = ({state, story}) => {
  const outerStyle = {
    // backgroundColor: '#e8e8e8',
    backgroundColor: '#FFFFFF',
    padding: '4px 8px',
    borderRadius: '4px'
  }

  const addTaskStyle: CSSProperties = {
    padding: '12px 16px',
    borderRadius: '4px',
    backgroundColor: 'white',
    textAlign: "center",
    border: '1px solid #d9d9d9'
  }

  const [, drop] = useDrop({
    accept: 'taskCard',
    canDrop: (item: IDragObject) => {
      return !!story.tasks.find((task: ITask) => item.task === task);
    },
    drop: (item: IDragObject) => {
      store.dispatch({
        type: 'kanban-moveTask',
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
      title: '添加任务',
      okText: '保存',
      cancelText: '取消',
      icon: <Icon type="plus-circle"/>,
      width: 600,
      content: <TaskForm wrappedComponentRef={(form: any) => taskForm = form} task={{id: guid(), state}}/>,
      centered: true,
      onOk: () => {
        if (taskForm && taskForm.props) {
          store.dispatch({
            type: 'kanban-addTask',
            story,
            task: {
              ...taskForm.props.task,
              ...taskForm.props.form.getFieldsValue(),
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
      {state === 'todo' ? (
        <div style={addTaskStyle} onClick={addTask}>
          <span style={{cursor: 'pointer'}}><Icon type="plus" />添加任务</span>
        </div>
      ) : <></>}
    </div>
  );
};

export default TaskCardContainer;