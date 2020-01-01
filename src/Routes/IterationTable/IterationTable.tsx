import StoryMapContext from "../../common/contexts/StoryMapContext";
import React from "react";
import VisibleIterationTable from "../../IterationTable/IterationTable";
import useRouter from "use-react-router";

const IterationTable: React.FC = () => {
  const {
    storyMapData: { iterations }
  } = StoryMapContext.useContainer();

  return <VisibleIterationTable iterations={iterations} />;
};

export default () => {
  const { match } = useRouter<{
    projectId: string;
  }>();

  const { projectId } = match.params;

  return (
    <StoryMapContext.Provider initialState={projectId}>
      <IterationTable />
    </StoryMapContext.Provider>
  );
};
