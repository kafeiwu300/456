import { useState, useEffect } from "react";
import { IStory, IStoryInfo, ITask } from "../../components/Kanban/interfaces";
import { createContainer } from "unstated-next";
import {
  getStories as originalGetStories,
  removeStory as originalRemoveStory,
  modifyStory as originalModifyStory,
  addStory as originalAddStory
} from "../../agent/storyAgent";
import {
  removeTask as originalRemoveTask,
  modifyTask as originalModifyTask,
  addTask as originalAddTask
} from "../../agent/taskAgent";

const useKanban = (iterationId?: string) => {
  const [stories, setStories] = useState<IStory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (iterationId) {
      getStories(iterationId);
    } else {
      setStories([]);
    }
  }, [iterationId]);

  const getStories = (iterationId: string) => {
    setLoading(true);
    originalGetStories(iterationId)
      .then(res => setStories(res.body))
      .finally(() => setLoading(false));
  };

  const removeStory = (storyId: string) => {
    setLoading(true);
    originalRemoveStory(storyId).then(() => getStories(iterationId!));
  };

  const modifyStory = (story: IStoryInfo) => {
    setLoading(true);
    originalModifyStory(story).then(() => getStories(iterationId!));
  };

  const addStory = (
    story: IStoryInfo,
    projectId: string,
    iterationId?: string,
    epicId?: string
  ) => {
    setLoading(true);
    originalAddStory(story, projectId, iterationId, epicId).then(() =>
      getStories(iterationId!)
    );
  };

  const removeTask = (taskId: string) => {
    setLoading(true);
    originalRemoveTask(taskId).then(() => getStories(iterationId!));
  };

  const modifyTask = (task: ITask) => {
    setLoading(true);
    originalModifyTask(task).then(() => getStories(iterationId!));
  };

  const addTask = (task: ITask) => {
    setLoading(true);
    originalAddTask(task).then(() => getStories(iterationId!));
  };

  return {
    stories,
    loading,
    getStories,
    removeStory,
    modifyStory,
    addStory,
    removeTask,
    modifyTask,
    addTask
  };
};

export default createContainer(useKanban);
