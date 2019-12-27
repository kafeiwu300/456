import { DragObjectWithType } from "react-dnd";
import { Action } from "redux";
import { ActionType, KanbanState, StoryState } from "../enums";
import { FormComponentProps } from "antd/lib/form/Form";

export interface ITask {
  id?: string,
  title?: string,
  status?: KanbanState,
  description?: string,
  priority?: 'very high' | 'high' | 'middle' | 'low',
  estimatedHours?: number,
  taskPoint?: number,
  leader?: string
}

export interface IStoryInfo {
  id?: string,
  title?: string,
  description?: string,
  leader?: string,
  priority?: number,
  estimatedHours?: number,
  storyPoint?: number,
  status?: string
}

export interface IStory extends IStoryInfo {
  taskList: ITask[]
}

export interface IDragObject extends DragObjectWithType {
  task: ITask
}

export interface IKanbanAction extends Action<ActionType> {
  data: IStory[];
  projectId: string;
  iterationId: string;
}

export interface IStoryAction extends IKanbanAction {
  story: IStoryInfo,
  state?: KanbanState
}

export interface ITaskAction extends IKanbanAction {
  task: ITask,
  story: IStoryInfo,
  status: KanbanState,
  isFinished: boolean
}

export interface ITaskFormComponentProps extends FormComponentProps<ITask> {
  initialValue?: ITask;
  taskStatus: KanbanState[];
}

export interface IStoryFormComponentProps extends FormComponentProps<IStory> {
  initialValue?: IStoryInfo;
  storyStatus: StoryState[];
}