import React from 'react';
import { Modal, Icon } from 'antd';
import { useDrag } from 'react-dnd';
import { ITask, IDragObject, IStory } from './interfaces';
import store from './store';
import ActionType from './ActionType';
import TaskForm from './TaskForm';

const TaskCard: React.FC<{story: IStory, task: ITask}> = ({story, task}) => {
  const dragObject: IDragObject = {
    type: 'taskCard',
    task
  };

  let taskForm: any = undefined;

  const showInfo = () => {
    Modal.confirm({
      okText: '保存',
      cancelText: '取消',
      icon: <></>,
      width: 600,
      content: <TaskForm wrappedComponentRef={(form: any) => taskForm = form} task={task}/>,
      centered: true,
      onOk: () => {
        if (taskForm && taskForm.props) {
          const t: ITask = {
            id: task.id,
            ...taskForm.props.form.getFieldsValue()
          };
          store.dispatch({
            type: ActionType.modifyTask,
            story,
            task: t,
            state: task.state
          })
        }
      }
    })
  }

  const [, drag] = useDrag({
    item: dragObject,
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const removeTask = () => {
    Modal.confirm({
      content: '确定要删除这个任务吗？',
      okText: '确定',
      cancelText: '取消',
      width:  600,
      onOk: () => {
        store.dispatch({
          type: ActionType.removeTask,
          story,
          task,
          state: task.state
        });
      }
    })
  }

  return (
    <div ref={drag} style={{
      margin: '4px', 
      padding: '16px',
      borderRadius: '4px',
      backgroundColor: 'white',
      display: 'flex'
    }}>
      <div style={{
        display: 'inline-block', 
        fontSize: '14px', 
        fontWeight: 'bold', 
        flex: 'auto',
        cursor: 'pointer'
      }} onClick={showInfo}>
        {task.title}
      </div>
      <div style={{float: 'right', flex: 'initial'}}>
        <Icon type="delete" onClick={removeTask} />
      </div>
    </div>
  );
}

export default TaskCard;