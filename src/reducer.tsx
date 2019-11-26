import { Reducer, Action } from "redux";
import { IState } from "./interfaces";
import { ActionType } from "./enums";
import { kanbanReducer } from "./Kanban/reducer";
import { IKanbanAction } from "./Kanban/interfaces";
import { IStoryMapAction } from "./StoryMap/interfaces";
import { storyMapReducer } from "./StoryMap/reducer";

export const reducer: Reducer<IState, Action<ActionType>> = (prevState, action) => {
  let state = prevState || {
    kanbanData: [],
    storyMapData: {
      epics: [],
      iterations: [],
      unplannedStories: []
    }
  };
  state = {
    kanbanData: action.type.startsWith('kanban') ? kanbanReducer(state.kanbanData, action as IKanbanAction) : state.kanbanData,
    storyMapData: action.type.startsWith('storyMap') ? storyMapReducer(state.storyMapData, action as IStoryMapAction) : state.storyMapData
  }
  return state;
};