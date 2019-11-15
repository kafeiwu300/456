import { IStoryInfo } from "../Kanban/interfaces";

export interface IStoryInIteration extends IStoryInfo {
  iterationId: string
}

export interface IEpicInfo {
  id: string,
  title?: string,
  description?: string,
}

export interface IEpic extends IEpicInfo {
  stories: IStoryInIteration[]
}

export interface IStoryInEpic extends IStoryInfo {
  epicId: string
}

export interface IIteration {
  id: string,
  index: number,
  title?: string,
}

export interface IIterationWithStory extends IIteration {
  stories: IStoryInEpic[]
}