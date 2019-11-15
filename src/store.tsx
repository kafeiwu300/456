import { createStore, Action } from "redux";
import { IStory, IStoryAction, ITaskAction } from "./Kanban/interfaces";
import { kanbanReducer } from "./Kanban/reducer";
import { kanbanData } from "./Kanban/store";
import { storyMapData } from './StoryMap/store';
import { reducer } from "./reducer";
import { ActionType } from "./Kanban/enums";
import { IState } from "./interfaces";

const data: IState = {
  kanbanData,
  storyMapData
};

export let store = createStore<IStory[], IStoryAction | ITaskAction, IStory[], unknown>(kanbanReducer, kanbanData);
const s = createStore<IState, Action<ActionType>, IState, unknown>(reducer, data);