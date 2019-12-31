import { useEffect, useState } from "react";
import { IEpicInfo, IIteration, IStoryInEpic } from "../../components/StoryMap/interfaces";
import { createContainer } from "unstated-next"
import { getIterations } from "../../agent/agileAgent";
import { getEpics } from "../../agent/epicAgent";
import { getIterationOrphan } from "../../agent/storyAgent";

const useStoryMap = (projectId?: string) => {
  const emptyStoryMap: {
    epics: IEpicInfo[];
    iterations: IIteration[];
    unplannedStories: IStoryInEpic[];
  } = {
    epics: [],
    iterations: [],
    unplannedStories: []
  };

  const [storyMapData, setStoryMapData] = useState<{
    epics: IEpicInfo[];
    iterations: IIteration[];
    unplannedStories: IStoryInEpic[];
  }>(emptyStoryMap);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (projectId) {
      setLoading(true);
      (async () => {
        const iterations = await getIterations(projectId).then(res => res.body);
        const epics = await getEpics(projectId).then(res => res.body);
        const unplannedStories = await getIterationOrphan(projectId).then(res => res.body);
        setStoryMapData({iterations, epics, unplannedStories});
        setLoading(false);
      })();
    } else {
      setStoryMapData(emptyStoryMap);
    }
  }, [emptyStoryMap, projectId]);

  return {storyMapData, loading};
}

export default createContainer(useStoryMap);