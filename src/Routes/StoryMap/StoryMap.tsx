import { connect } from "react-redux";
import { IState } from "../../interfaces";
import VisibleStoryMap from "../../components/StoryMap/StoryMap";
import React from "react";
import StoryMapContext from "../../common/contexts/StoryMapContext";

export const StoryMap: React.FC = () => {
  const {
    storyMapData: { epics, iterations, unplannedStories }
  } = StoryMapContext.useContainer();

  return (
    <VisibleStoryMap
      epics={epics}
      iterations={iterations}
      unplannedStories={unplannedStories}
    />
  );
};

export default connect((state: IState) => ({ ...state.storyMapData }))(
  VisibleStoryMap
);
