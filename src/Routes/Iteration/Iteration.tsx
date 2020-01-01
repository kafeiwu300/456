import StoryMapContext from "../../common/contexts/StoryMapContext";
import useRouter from "use-react-router";
import { IIterationInfo } from "../../components/StoryMap/interfaces";
import { useEffect, useState } from "react";
import VisibleIteration from "../../IterationTable/Iteration";
import React from "react";

const Iteration: React.FC = () => {
  const {
    storyMapData: { iterations }
  } = StoryMapContext.useContainer();

  const { match } = useRouter<{
    projectId: string;
    iterationId: string;
  }>();

  const { iterationId } = match.params;

  const [iteration, setIteration] = useState<IIterationInfo>({});

  useEffect(() => {
    if (iterationId) {
      const i = iterations.filter(
        (iteration: IIterationInfo) => iteration.id === iterationId
      );
      setIteration(i.length > 0 ? i[0] : {});
    } else {
      setIteration({});
    }
  }, [iterationId, iterations]);

  return <VisibleIteration iteration={iteration} />;
};

export default () => {
  const { match } = useRouter<{
    projectId: string;
  }>();

  const { projectId } = match.params;

  return (
    <StoryMapContext.Provider initialState={projectId}>
      <Iteration />
    </StoryMapContext.Provider>
  );
};
