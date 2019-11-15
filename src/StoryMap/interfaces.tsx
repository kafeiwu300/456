import { IStoryInfo } from "../Kanban/interfaces";
import { DragObjectWithType } from "react-dnd";
import { Action } from "dnd-core";
import { ActionType } from "../enums";

export interface IDragObject extends DragObjectWithType {
  story: IStoryInEpic;
}

export interface IStoryMapAction extends Action<ActionType> {

}

export interface IIterationAction extends IStoryMapAction {
  iteration: IIteration;
}

export interface IEpicAction extends IStoryMapAction {
  epic: IEpicInfo;
}

export interface IStoryAction extends IStoryMapAction {
  story: IStoryInEpic;
  iteration: IIteration;
}

export interface IEpicInfo {
  id: string,
  title?: string,
  description?: string
}

export interface IEpic extends IEpicInfo {
  stories: IStoryInIteration[]
}

export interface IStoryInEpic extends IStoryInfo {
  epicId: string
}

export interface IIterationInfo {
  id: string,
  index: number,
  title?: string,
  isActive: boolean
}

export interface IIteration extends IIterationInfo {
  stories: IStoryInEpic[]
}

export interface IStoryInIteration extends IStoryInfo {
  iterationId: string
}