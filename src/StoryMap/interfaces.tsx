import { IStoryInfo } from "../Kanban/interfaces";

export interface IStoryInIteration extends IStoryInfo {
  iterationId: string
}

export interface IEpic {
  id: string,
  title?: string,
  description?: string,
  stories: IStoryInIteration[]
}

export interface IIteration {
  id: string,
  index: number,
  title?: string,
}