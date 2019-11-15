import { Reducer, Action } from "redux";
import { IState } from "./interfaces";
import { ActionType } from "./Kanban/enums";

export const reducer: Reducer<IState, Action<ActionType>> = (prevState, action) => {
  const state = prevState || {
    kanbanData: [],
    storyMapData: {
      epics: [],
      iterations: [],
    }
  };
  return state;
};