import VisibleStoryMap from "../../components/StoryMap/StoryMap";
import React from "react";
import StoryMapContext from "../../common/contexts/StoryMapContext";
import useRouter from "use-react-router";

const StoryMap: React.FC = () => {
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

export default () => {
  const { match } = useRouter<{
    projectId: string;
  }>();

  const { projectId } = match.params;

  return (
    <StoryMapContext.Provider initialState={projectId}>
      <StoryMap />
    </StoryMapContext.Provider>
  )
}
