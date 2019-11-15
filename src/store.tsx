import { createStore, Action } from "redux";
import { kanbanData } from "./Kanban/store";
import { storyMapData } from './StoryMap/store';
import { reducer } from "./reducer";
import { ActionType } from "./enums";
import { IState } from "./interfaces";

const data: IState = {
  kanbanData,
  storyMapData
};

export const store = createStore<IState, Action<ActionType>, IState, unknown>(reducer, data);