import { IStory } from "./Kanban/interfaces";
import { IEpicInfo, IIterationWithStory } from "./StoryMap/interfaces";

export interface IState {
  kanbanData: IStory[];
  storyMapData: {
    epics: IEpicInfo[];
    iterations: IIterationWithStory[];
  };
}