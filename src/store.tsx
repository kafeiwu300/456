import { createStore, Action } from "redux";
import { kanbanData } from "./Kanban/store";
import { storyMapData } from "./StoryMap/store";
import { bugData } from "./Bug/store";
import { reducer } from "./reducer";
import { ActionType } from "./enums";
import { IState } from "./interfaces";

const data: IState = {
  kanbanData,
  storyMapData,
  bugData
};

export const store = createStore<IState, Action<ActionType>, IState, unknown>(
  reducer,
  data
);
