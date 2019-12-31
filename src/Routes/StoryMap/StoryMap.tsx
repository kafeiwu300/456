import { connect } from "react-redux";
import { IState } from "../../interfaces";
import VisibleStoryMap from "../../components/StoryMap/StoryMap";
import React, { useContext } from "react";
import StoryMapContext from "../../common/contexts/StoryMapContext";

export const StoryMap: React.FC = () => {
  const {state: {
    epics, iterations, unplannedStories
  }} = useContext(StoryMapContext);

  return (
    <VisibleStoryMap epics={epics} iterations={iterations} unplannedStories={unplannedStories} />
  );
}

export default connect((state: IState) => ({ ...state.storyMapData }))(
  VisibleStoryMap
);