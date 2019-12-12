import { IStory } from "./Kanban/interfaces";
import { IBug } from "./Bug/interfaces";
import { IEpicInfo, IIteration, IStoryInEpic } from "./StoryMap/interfaces";
import { KanbanState, BugState, ActionType } from "./enums";
import { Action } from "redux";

export interface IProject {
  id?: string;
  name?: string;
  description?: string;
  teamId?: string;
  storyStatusList?: string[],
  taskStatusList?: KanbanState[],
  bugStatusList?: BugState[]
}

export interface IProjectAction extends Action<ActionType> {
  data?: IProject;
  projectId?: string;
}

export interface IState {
  kanbanData: IStory[];
  storyMapData: {
    epics: IEpicInfo[];
    iterations: IIteration[];
    unplannedStories: IStoryInEpic[];
  };
  bugData: IBug[];
}