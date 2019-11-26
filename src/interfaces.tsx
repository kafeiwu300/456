import { IStory } from "./Kanban/interfaces";
import { IEpicInfo, IIteration, IStoryInEpic } from "./StoryMap/interfaces";

export interface IState {
  kanbanData: IStory[];
  storyMapData: {
    epics: IEpicInfo[];
    iterations: IIteration[];
    unplannedStories: IStoryInEpic[];
  };
}