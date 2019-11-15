import { DragObjectWithType } from "react-dnd";
import { Action } from "redux";
import { ActionType, State } from "./enums";
import { FormComponentProps } from "antd/lib/form/Form";

export interface ITask {
  id: string,
  title?: string,
  state?: State,
  description?: string,
  priority?: 'very high' | 'high' | 'middle' | 'low',
  estimatedHours?: number,
  taskPoint?: number,
  leader?: string
}

export interface IStoryInfo {
  id: string,
  title?: string,
  description?: string,
  leader?: string,
  priority?: number,
  estimatedHours?: number,
  storyPoint?: number,
  state?: string
}

export interface IStory extends IStoryInfo {
  tasks: ITask[]
}

export interface IDragObject extends DragObjectWithType {
  task: ITask
}

export interface IStoryAction extends Action<ActionType> {
  story: IStoryInfo,
  state?: State
}

export interface ITaskAction extends Action<ActionType> {
  task: ITask,
  story: IStoryInfo,
  state?: State
}

export interface ITaskFormComponentProps extends FormComponentProps<ITask> {
  task?: ITask;
}

export interface IStoryFormComponentProps extends FormComponentProps<IStory> {
  story?: IStory;
}