import React, { useState } from "react";
import {
  Modal,
  Collapse,
  Descriptions,
  Badge,
  Tag,
  Avatar,
  Button,
  Icon
} from "antd";
import { useDrag } from "react-dnd";
import { ITask, IDragObject, IStory } from "./interfaces";
import TaskForm from "./TaskForm";
import ProjectContext from "../../common/contexts/ProjectContext";
import KanbanContext from "../../common/contexts/KanbanContext";

const TaskCard: React.FC<{ story: IStory; task: ITask }> = ({
  task
}) => {
  const dragObject: IDragObject = {
    type: "taskCard",
    task
  };

  const [ghost, setGhost] = useState<boolean>(true);

  const { project } = ProjectContext.useContainer();
  const {
    modifyTask: _modifyTask,
    removeTask: _removeTask
  } = KanbanContext.useContainer();

  let taskForm: any = undefined;

  const modifyTask = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    Modal.confirm({
      title: "修改任务",
      okText: "保存",
      cancelText: "取消",
      icon: <Icon type="edit" />,
      width: 600,
      content: (
        <TaskForm
          taskStatus={project.taskStatusList}
          wrappedComponentRef={(form: any) => (taskForm = form)}
          initialValue={task}
        />
      ),
      centered: true,
      onOk: () => {
        if (taskForm && taskForm.props) {
          _modifyTask({
            id: task.id,
            ...taskForm.props.form.getFieldsValue(),
            isFinished:
              taskForm.props.form.getFieldsValue().status ===
              project.taskStatusList[project.taskStatusList.length - 1]
          });
        }
      }
    });
  };

  const [, drag] = useDrag({
    item: dragObject,
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const removeTask = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    Modal.confirm({
      title: "删除任务",
      content: "确定要删除这个任务吗？",
      okText: "确定",
      cancelText: "取消",
      width: 600,
      icon: <Icon type="delete" />,
      onOk: () => {
        _removeTask(task.id!);
      }
    });
  };

  return (
    <div
      ref={drag}
      style={{ margin: "4px 0" }}
      onMouseOverCapture={() => setGhost(false)}
      onMouseOutCapture={() => setGhost(true)}
    >
      <Collapse>
        <Collapse.Panel
          showArrow={false}
          key={task.id!}
          header={task.title}
          style={{ wordBreak: "break-word" }}
          extra={
            <>
              <Button
                onClick={modifyTask}
                size="small"
                icon="edit"
                ghost={ghost}
                style={{ border: "none", backgroundColor: "transparent" }}
              />
              <Button
                onClick={removeTask}
                size="small"
                icon="delete"
                ghost={ghost}
                style={{ border: "none", backgroundColor: "transparent" }}
              />
            </>
          }
        >
          {task.priority ? (
            <Tag color="#fa8c16" title="优先级">
              {task.priority}
            </Tag>
          ) : (
            <></>
          )}
          {task.leader ? (
            <span title={task.leader}>
              <Avatar shape="square">
                {task.leader[task.leader.length - 1]}
              </Avatar>
            </span>
          ) : (
            <></>
          )}
          {task.taskPoint ? (
            <Badge
              count={task.taskPoint}
              title="任务点"
              style={{ backgroundColor: "#bfbfbf" }}
              offset={task.leader ? [8, 0] : [0, 0]}
            />
          ) : (
            <></>
          )}
          <Descriptions size="small" colon={false}>
            <Descriptions.Item label="" span={4}>
              {task.description}
            </Descriptions.Item>
            {/* <Descriptions.Item label='状态' span={4}>{task.state}</Descriptions.Item> */}
            {/* <Descriptions.Item label='估算工时' span={4}>{task.estimatedHours}</Descriptions.Item> */}
          </Descriptions>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

export default TaskCard;
