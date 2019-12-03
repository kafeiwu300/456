import { Reducer } from "react";
import { IStoryAction, IIterationAction, IIteration, IEpicAction, IStoryInEpic, IStoryMapAction } from "./interfaces";
import { IEpicInfo, IIterationInfo } from "./interfaces";
import { getIterations } from "../agent/agileAgent";
import { store } from "../store";
import { getEpics, removeEpic, addEpic, modifyEpic } from "../agent/epicAgent";
import { getIterationOrphan, removeStory, modifyStory, moveStory, addStory } from "../agent/storyAgent";
import { modifyIteration, addIteration, removeIteration } from "../agent/iterationAgent";

const getStoryMapData = async (projectId: string) => {
  const iterations = await getIterations(projectId).then(res => res.body);
  const epics = await getEpics(projectId).then(res => res.body);
  const unplannedStories = await getIterationOrphan(projectId).then(res => res.body);
  store.dispatch({
    type: 'storyMap-setData',
    data: {epics, iterations, unplannedStories}
  });
};

const storyReducer: Reducer<{
  epics: IEpicInfo[];
  iterations: IIteration[];
  unplannedStories: IStoryInEpic[];
}, IStoryAction> = (prevState, action) => {
  let state = prevState ? {...prevState} : {
    epics: [],
    iterations: [],
    unplannedStories: []
  };
  switch (action.type) {
    case 'storyMap-moveStory': {
      // state.iterations.forEach((iteration: IIteration) => iteration.storyList = iteration.storyList.filter((story: IStoryInEpic) => story.id !== action.story.id));
      // state.unplannedStories = state.unplannedStories.filter((story: IStoryInEpic) => story.id !== action.story.id);
      // if (action.iteration) {
      //   const iteration = state.iterations.find((ite: IIteration) => ite.id === action.iteration!.id);
      //   if (iteration) {
      //     iteration.storyList = iteration.storyList.concat(action.story);
      //   }
      // } else {
      //   state.unplannedStories = state.unplannedStories.concat(action.story);
      // }
      moveStory(action.story, action.iteration && action.iteration.id, action.story.epicId).then(() => getStoryMapData(action.projectId));
    } break;
    case 'storyMap-addStory': {
      // if (action.iteration) {
      //   const iteration = state.iterations.find((ite: IIteration) => ite.id === action.iteration!.id);
      //   if (iteration) {
      //     iteration.storyList = iteration.storyList.concat(action.story);
      //   }
      // } else {
      //   state.unplannedStories = state.unplannedStories.concat(action.story);
      // }
      addStory(action.story, action.projectId, action.iteration!.id, action.story.epicId).then(() => getStoryMapData(action.projectId));
    } break;
    case 'storyMap-removeStory': {
      // state.iterations.forEach((iteration: IIteration) => iteration.storyList = iteration.storyList.filter((story: IStoryInEpic) => story.id !== action.story.id));
      // state.unplannedStories = state.unplannedStories.filter((story: IStoryInEpic) => story.id !== action.story.id);
      removeStory(action.story.id!).then(() => getStoryMapData(action.projectId));
    } break;
    case 'storyMap-modifyStory': {
      // state.iterations.forEach((iteration: IIteration) => iteration.storyList = iteration.storyList.map((story: IStoryInEpic) => story.id === action.story.id ? action.story : story));
      // state.unplannedStories = state.unplannedStories.map((story: IStoryInEpic) => story.id === action.story.id ? action.story : story);
      modifyStory(action.story).then(() => getStoryMapData(action.projectId));
    } break;
  }
  return state;
}

const epicReducer: Reducer<{
  epics: IEpicInfo[];
  iterations: IIteration[];
  unplannedStories: IStoryInEpic[];
}, IEpicAction> = (prevState, action) => {
  let state = prevState ? {...prevState} : {
    epics: [],
    iterations: [],
    unplannedStories: []
  };
  switch (action.type) {
    case 'storyMap-addEpic':
      // state.epics = state.epics.concat(action.epic);
      addEpic(action.projectId, action.epic).then(() => getStoryMapData(action.projectId));
      break;
    case 'storyMap-removeEpic':
      // state.epics = state.epics.filter((epic: IEpicInfo) => epic.id !== action.epic.id);
      removeEpic(action.epic.id!).then(() => getStoryMapData(action.projectId));
      break;
    case 'storyMap-modifyEpic':
      // state.epics = state.epics.map((epic: IEpicInfo) => epic.id === action.epic.id ? action.epic : epic);
      modifyEpic(action.epic).then(() => getStoryMapData(action.projectId));
      break;
  }
  return state;
}

const iterationReducer: Reducer<{
  epics: IEpicInfo[];
  iterations: IIteration[];
  unplannedStories: IStoryInEpic[];
}, IIterationAction> = (prevState, action) => {
  let state = prevState ? {...prevState} : {
    epics: [],
    iterations: [],
    unplannedStories: []
  };
  switch (action.type) {
    case 'storyMap-addIteration':
      // state.iterations = state.iterations.concat({...action.iteration, storyList: []});
      addIteration(action.iteration, action.projectId).then(() => getStoryMapData(action.projectId));
      break;
    case 'storyMap-removeIteration':
      // state.iterations = state.iterations.filter((iteration: IIterationInfo) => action.iteration.id !== iteration.id);
      removeIteration(action.iteration.id!).then(() => getStoryMapData(action.projectId));
      break;
    case 'storyMap-modifyIteration':
      // state.iterations = state.iterations.map((iteration: IIteration) => action.iteration.id === iteration.id ? action.iteration : iteration);
      modifyIteration(action.iteration).then(() => getStoryMapData(action.projectId));
      break;
  }
  return state;
}

export const storyMapReducer: Reducer<{
  epics: IEpicInfo[];
  iterations: IIteration[];
  unplannedStories: IStoryInEpic[];
}, IStoryMapAction> = (prevState, action) => {
  if (action.type === 'storyMap-setData') {
    return action.data!;
  }
  else if (action.type === 'storyMap-getData') {
    getStoryMapData(action.projectId);
    return prevState;
  } else {
    return epicReducer(iterationReducer(storyReducer(prevState, action as IStoryAction), action as IIterationAction), action as IEpicAction);
  }
}