import { useReducer } from "react";
import { storyMapReducer } from "../../components/StoryMap/reducer";
import { IEpicInfo, IIteration, IStoryInEpic } from "../../components/StoryMap/interfaces";
import { createContainer } from "unstated-next"

const useStoryMap = (initialState: {
  epics: IEpicInfo[];
  iterations: IIteration[];
  unplannedStories: IStoryInEpic[];
} = {
  epics: [],
  iterations: [],
  unplannedStories: []
}) => {
  const [store, dispatch] = useReducer(storyMapReducer, initialState);
  return {
    store, dispatch
  }
}

export default createContainer(useStoryMap);