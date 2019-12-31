import React from "react";
import { storyMapReducer } from "../../components/StoryMap/reducer";
import { IEpicInfo, IIteration, IStoryInEpic } from "../../components/StoryMap/interfaces";

const storyMapData: {
  epics: IEpicInfo[];
  iterations: IIteration[];
  unplannedStories: IStoryInEpic[];
} = {
  epics: [],
  iterations: [],
  unplannedStories: []
}

const StoryMapContext = React.createContext({
  state: storyMapData,
  reducer: storyMapReducer
});

export default StoryMapContext;