import React, { CSSProperties, useContext } from 'react';
import { Icon, Modal } from 'antd';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';
import { IStory, IDragObject, ITask } from './interfaces';
import { KanbanState } from "../enums";
import TaskForm from './TaskForm';
import { store } from '../store';
import useRouter from 'use-react-router';
import ProjectContext from '../common/contexts/ProjectContext';

const TaskCardContainer: React.FC<{
  status: KanbanState,
  story: IStory,
  canAddTask: boolean,
  finished: boolean
}> = ({status, story, canAddTask, finished}) => {
  const outerStyle = {
    // backgroundColor: '#e8e8e8',
    backgroundColor: '#FFFFFF',
    padding: '4px 8px',
    borderRadius: '4px',
    border: "1px solid #d9d9d9",
  }

  const addTaskStyle: CSSProperties = {
    padding: '12px 16px',
    borderRadius: '4px',
    backgroundColor: 'white',
    textAlign: "center",
    border: '1px solid #d9d9d9',
    margin: '4px 0'
  }

  const [, drop] = useDrop({
    accept: 'taskCard',
    canDrop: (item: IDragObject) => {
      return !!story.taskList.find((task: ITask) => item.task === task);
    },
    drop: (item: IDragObject) => {
      store.dispatch({
        type: 'kanban-moveTask',
        story,
        task: {...item.task, isFinished: finished, status},
        iterationId,
      })
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  let taskForm: any = undefined;

  const { match } = useRouter<{
    projectId: string,
    iterationId: string
  }>();
  const { projectId, iterationId } = match.params;

  const project = useContext(ProjectContext);

  const addTask = () => {
    Modal.confirm({
      title: '添加任务',
      okText: '保存',
      cancelText: '取消',
      icon: <Icon type="plus-circle"/>,
      width: 600,
      content: <TaskForm taskStatus={project.taskStatusList} wrappedComponentRef={(form: any) => taskForm = form} initialValue={{status}}/>,
      centered: true,
      onOk: () => {
        if (taskForm && taskForm.props) {
          store.dispatch({
            type: 'kanban-addTask',
            story,
            task: {
              ...taskForm.props.task,
              ...taskForm.props.form.getFieldsValue(),
              story: story.id ? {id: story.id} : null,
              status,
              project: projectId ? {id: projectId} : null
            },
            iterationId
          });
        }
      }
    });
  };

  return (
    <div ref={drop} style={outerStyle}>
      {(() => {
        const list = story.taskList.filter(
          (task: ITask) => task.status === status
        ).map(
          (task: ITask) => <TaskCard story={story} task={task}/>
        )
        return !canAddTask && list.length === 0 ? <div style={{textAlign: 'center', minHeight: '50px', lineHeight: '50px', color: '#aaa'}}>无任务</div> : list;
      })()}
      {canAddTask ? (
        <div style={addTaskStyle} onClick={addTask}>
          <span style={{cursor: 'pointer'}}><Icon type="plus" />添加任务</span>
        </div>
      ) : <></>}
    </div>
  );
};

export default TaskCardContainer;