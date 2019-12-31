import { createStore, Action } from "redux";
import { kanbanData } from "./components/Kanban/store";
import { storyMapData } from "./components/StoryMap/store";
import { bugData } from "./components/Bug/store";
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
