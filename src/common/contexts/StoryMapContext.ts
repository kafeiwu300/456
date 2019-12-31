import { useEffect, useState } from "react";
import {
  IEpicInfo,
  IIteration,
  IStoryInEpic,
  IIterationInfo
} from "../../components/StoryMap/interfaces";
import { createContainer } from "unstated-next";
import {
  modifyIteration as originalModifyIteration,
  addIteration as originalAddIteration,
  removeIteration as originalRemoveIteration,
  getIterations
} from "../../agent/iterationAgent";
import {
  getEpics,
  removeEpic as originalRemoveEpic,
  addEpic as originalAddEpic,
  modifyEpic as originalModifyEpic
} from "../../agent/epicAgent";
import {
  getIterationOrphan,
  moveStory as originalMoveStory,
  removeStory as originalRemoveStory,
  addStory as originalAddStory,
  modifyStory as originalModifyStory
} from "../../agent/storyAgent";
import { IStoryInfo } from "../../components/Kanban/interfaces";

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

  const getStoryMapData = async (projectId: string) => {
    const iterations = await getIterations(projectId).then(res => res.body);
    const epics = await getEpics(projectId).then(res => res.body);
    const unplannedStories = await getIterationOrphan(projectId).then(
      res => res.body
    );
    setStoryMapData({ iterations, epics, unplannedStories });
    setLoading(false);
  };

  useEffect(() => {
    if (projectId) {
      setLoading(true);
      getStoryMapData(projectId);
    } else {
      setStoryMapData(emptyStoryMap);
    }
  }, [emptyStoryMap, projectId]);

  const moveStory = (
    story: IStoryInfo,
    iterationId: string,
    epicId: string
  ) => {
    setLoading(true);
    originalMoveStory(story, iterationId, epicId).then(() =>
      getStoryMapData(projectId!)
    );
  };

  const removeStory = (storyId: string) => {
    setLoading(true);
    originalRemoveStory(storyId).then(() => getStoryMapData(projectId!));
  };

  const addStory = (
    story: IStoryInfo,
    projectId: string,
    iterationId?: string,
    epicId?: string
  ) => {
    setLoading(true);
    originalAddStory(story, projectId, iterationId, epicId).then(() =>
      getStoryMapData(projectId!)
    );
  };

  const modifyStory = (story: IStoryInfo) => {
    setLoading(true);
    originalModifyStory(story).then(() => getStoryMapData(projectId!));
  };

  const addEpic = (epic: IEpicInfo) => {
    setLoading(true);
    originalAddEpic(projectId!, epic).then(() => getStoryMapData(projectId!));
  };

  const removeEpic = (epicId: string) => {
    setLoading(true);
    originalRemoveEpic(epicId).then(() => getStoryMapData(projectId!));
  };

  const modifyEpic = (epic: IEpicInfo) => {
    setLoading(true);
    originalModifyEpic(epic).then(() => getStoryMapData(projectId!));
  };

  const addIteration = (iteration: IIterationInfo) => {
    setLoading(true);
    originalAddIteration(iteration, projectId!).then(() =>
      getStoryMapData(projectId!)
    );
  };

  const removeIteration = (iterationId: string) => {
    setLoading(true);
    originalRemoveIteration(iterationId).then(() =>
      getStoryMapData(projectId!)
    );
  };

  const modifyIteration = (iteration: IIterationInfo) => {
    setLoading(true);
    originalModifyIteration(iteration, projectId!).then(() =>
      getStoryMapData(projectId!)
    );
  };

  return {
    storyMapData,
    loading,
    moveStory,
    removeStory,
    addStory,
    modifyStory,
    addEpic,
    removeEpic,
    modifyEpic,
    addIteration,
    removeIteration,
    modifyIteration
  };
};

export default createContainer(useStoryMap);
