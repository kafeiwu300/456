import { Reducer } from "react";
import { IStoryAction, IIterationAction, IIteration, IEpicAction, IStoryInEpic, IStoryMapAction } from "./interfaces";
import { IEpicInfo, IIterationInfo } from "./interfaces";

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
      state.iterations.forEach((iteration: IIteration) => iteration.stories = iteration.stories.filter((story: IStoryInEpic) => story.id !== action.story.id));
      const iteration = state.iterations.find((ite: IIteration) => ite.id === action.iteration.id);
      if (iteration) {
        iteration.stories = iteration.stories.concat(action.story);
      }
    } break;
    case 'storyMap-addStory': {
      const iteration = state.iterations.find((ite: IIteration) => ite.id === action.iteration.id);
      if (iteration) {
        iteration.stories = iteration.stories.concat(action.story);
      }
    } break;
    case 'storyMap-removeStory':
      state.iterations.forEach((iteration: IIteration) => iteration.stories = iteration.stories.filter((story: IStoryInEpic) => story.id !== action.story.id));
      break;
    case 'storyMap-modifyStory':
      state.iterations.forEach((iteration: IIteration) => iteration.stories = iteration.stories.map((story: IStoryInEpic) => story.id === action.story.id ? action.story : story));
      break;
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
      state.epics = state.epics.concat(action.epic);
      break;
    case 'storyMap-removeEpic':
      state.epics = state.epics.filter((epic: IEpicInfo) => epic.id !== action.epic.id);
      break;
    case 'storyMap-modifyEpic':
      state.epics = state.epics.map((epic: IEpicInfo) => epic.id === action.epic.id ? action.epic : epic);
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
      state.iterations = state.iterations.concat({...action.iteration, stories: []});
      break;
    case 'storyMap-removeIteration':
      state.iterations = state.iterations.filter((iteration: IIterationInfo) => action.iteration.id !== iteration.id);
      break;
    case 'storyMap-modifyIteration':
      state.iterations = state.iterations.map((iteration: IIteration) => action.iteration.id === iteration.id ? action.iteration : iteration);
      break;
  }
  return state;
}

export const storyMapReducer: Reducer<{
  epics: IEpicInfo[];
  iterations: IIteration[];
  unplannedStories: IStoryInEpic[];
}, IStoryMapAction> = (prevState, action) => {
  return epicReducer(iterationReducer(storyReducer(prevState, action as IStoryAction), action as IIterationAction), action as IEpicAction);
}