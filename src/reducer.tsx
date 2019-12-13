import { Reducer, Action } from "redux";
import { IState, IProject, IProjectAction } from "./interfaces";
import { ActionType } from "./enums";
import { kanbanReducer } from "./Kanban/reducer";
import { IKanbanAction } from "./Kanban/interfaces";
import { IStoryMapAction } from "./StoryMap/interfaces";
import { storyMapReducer } from "./StoryMap/reducer";
import { bugReducer } from "./Bug/reducer";
import { IBugAction } from "./Bug/interfaces";
import { store } from "./store";
import { getProject } from "./agent/projectAgent";

const getProjectInfo = async (projectId: string) => {
  const projectInfo = await getProject(projectId).then(res => res.body);
  store.dispatch({
    type: 'project-setData',
    data: projectInfo
  });
}

export const projectReducer: Reducer<IProject, IProjectAction> = (prevState, action) => {
  let state = prevState ? {...prevState} : {
    id: '',
    name: '',
    description: '',
    teamId: '',
    storyStatusList: [],
    taskStatusList: [],
    bugStatusList: []
  };
  switch (action.type) {
    case 'project-getData':
      getProjectInfo(action.projectId!);
      break;
    case 'project-setData':
      return action.data!;
  }
  return state;
}

export const reducer: Reducer<IState, Action<ActionType>> = (prevState, action) => {
  // console.log(action);
  let state = prevState || {
    projectInfo: {
      id: '',
      name: '',
      description: '',
      teamId: '',
      storyStatusList: [],
      taskStatusList: [],
      bugStatusList: []
    },
    kanbanData: [],
    storyMapData: {
      epics: [],
      iterations: [],
      unplannedStories: []
    },
    bugData: []
  };
  state = {
    projectInfo: projectReducer(state.projectInfo, action as IProjectAction),
    kanbanData: kanbanReducer(state.kanbanData, action as IKanbanAction),
    storyMapData: storyMapReducer(state.storyMapData, action as IStoryMapAction),
    bugData: bugReducer(state.bugData, action as IBugAction),
  }
  return state;
};