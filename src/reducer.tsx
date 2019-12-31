import { Reducer, Action } from "redux";
import { IState } from "./interfaces";
import { ActionType } from "./enums";
import { kanbanReducer } from "./components/Kanban/reducer";
import { IKanbanAction } from "./components/Kanban/interfaces";
import { IStoryMapAction } from "./components/StoryMap/interfaces";
import { storyMapReducer } from "./components/StoryMap/reducer";
import { bugReducer } from "./components/Bug/reducer";
import { IBugAction } from "./components/Bug/interfaces";

export const reducer: Reducer<IState, Action<ActionType>> = (prevState, action) => {
  // console.log(action);
  let state = prevState || {
    kanbanData: [],
    storyMapData: {
      epics: [],
      iterations: [],
      unplannedStories: []
    },
    bugData: []
  };
  state = {
    kanbanData: kanbanReducer(state.kanbanData, action as IKanbanAction),
    storyMapData: storyMapReducer(state.storyMapData, action as IStoryMapAction),
    bugData: bugReducer(state.bugData, action as IBugAction),
  }
  return state;
};