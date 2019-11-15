import React, { useState } from 'react';
import { Modal, Collapse, Descriptions, Badge, Tag, Avatar, Button } from 'antd';
import { useDrag } from 'react-dnd';
import { ITask, IDragObject, IStory } from './interfaces';
import TaskForm from './TaskForm';
import { store } from '../store';

const TaskCard: React.FC<{story: IStory, task: ITask}> = ({story, task}) => {
  const dragObject: IDragObject = {
    type: 'taskCard',
    task
  };

  const [ghost, setGhost] = useState<boolean>(true);

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
            type: 'kanban-modifyTask',
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
          type: 'kanban-removeTask',
          story,
          task,
          state: task.state
        });
      }
    })
  }

  return (
    <div ref={drag} style={{margin: '4px 0'}} onMouseOverCapture={() => setGhost(false)} onMouseOutCapture={() => setGhost(true)}>
      <Collapse>
        <Collapse.Panel showArrow={false} key={task.id!} header={task.title} style={{position: 'relative'}} extra={
          <>
            <Button onClick={modifyTask} size='small' icon='edit' ghost={ghost} style={{border: 'none'}}/>
            <Button onClick={removeTask} size='small' icon='delete' ghost={ghost} style={{border: 'none'}}/>
          </>
        }>
          {task.priority ? <Tag color='#fa8c16' title="优先级">{task.priority}</Tag> : <></>}
          {task.leader ? <span title={task.leader}><Avatar shape="square" icon="user"/></span> : <></>}
          {task.taskPoint ? <Badge count={task.taskPoint} title="任务点" style={{backgroundColor: '#bfbfbf'}} offset={task.leader ? [8, 0] : [0, 0]}/> : <></>}
          <Descriptions size='small' colon={false}>
            <Descriptions.Item label='' span={4}>{task.description}</Descriptions.Item>
            {/* <Descriptions.Item label='状态' span={4}>{task.state}</Descriptions.Item> */}
            {/* <Descriptions.Item label='估算工时' span={4}>{task.estimatedHours}</Descriptions.Item> */}
          </Descriptions>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
}

export default TaskCard;