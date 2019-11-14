import React from 'react';
import { Modal, Icon, Collapse, Descriptions } from 'antd';
import { useDrag } from 'react-dnd';
import { ITask, IDragObject, IStory } from '../interfaces';
import store from './store';
import { ActionType } from "./enums";
import TaskForm from './TaskForm';

const TaskCard: React.FC<{story: IStory, task: ITask}> = ({story, task}) => {
  const dragObject: IDragObject = {
    type: 'taskCard',
    task
  };

  let taskForm: any = undefined;

  const modifyTask = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
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

  const removeTask = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
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
    <div ref={drag} style={{margin: '4px 0'}}>
      <Collapse expandIconPosition='right'>
        <Collapse.Panel key={task.id!} header={task.title} extra={
          <>
            <Icon type="edit" onClick={modifyTask} style={{marginRight: '12px'}}/>
            <Icon type="delete" onClick={removeTask}/>
          </>
        }>
          <Descriptions size='small' colon={false}>
            <Descriptions.Item label='描述' span={4}>{task.description}</Descriptions.Item>
            <Descriptions.Item label='状态' span={4}>{task.state}</Descriptions.Item>
            <Descriptions.Item label='任务点' span={4}>{task.taskPoint}</Descriptions.Item>
            <Descriptions.Item label='估算工时' span={4}>{task.estimatedHours}</Descriptions.Item>
            <Descriptions.Item label='负责人' span={4}>{task.leader}</Descriptions.Item>
            <Descriptions.Item label='优先级' span={4}>{task.priority}</Descriptions.Item>
          </Descriptions>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
}

export default TaskCard;