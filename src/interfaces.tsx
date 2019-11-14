import { DragObjectWithType } from "react-dnd";
import { Action } from "redux";
import { ActionType, State } from "./Kanban/enums";
import { FormComponentProps } from "antd/lib/form/Form";

export interface ITask {
  id?: string,
  title?: string,
  state?: State,
  description?: string,
  priority?: number,
  estimatedHours?: number,
  taskPoint?: number,
  leader?: string
}

export interface IStory {
  id?: string,
  title?: string,
  tasks: ITask[],
  description?: string,
  leader?: string,
  priority?: number,
  estimatedHours?: number,
  storyPoint?: number,
  state?: string
}

export interface IDragObject extends DragObjectWithType {
  task: ITask
}

export interface IAction extends Action<ActionType> {
  task?: ITask,
  story: IStory,
  state?: State
}

export interface ITaskFormComponentProps extends FormComponentProps<ITask> {
  task?: ITask;
}

export interface IStoryFormComponentProps extends FormComponentProps<IStory> {
  story?: IStory;
}