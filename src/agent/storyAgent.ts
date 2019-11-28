import agent from "./agent";
import { BASE_URL } from "../common/consts";
import { IStoryInfo } from "../Kanban/interfaces";

export function getIterationOrphan(projectId: string) {
  return agent.get(`${BASE_URL}/stories/iteration-orphans`).query({project_id: projectId});
}

export function moveStory(story: IStoryInfo, iterationId?: string, epicId?: string) {
  return agent.put(`${BASE_URL}/stories/${story.id}`).send({
    id: story.id,
    iteration: { id: iterationId },
    epic: { id: epicId }
  });
}

export function modifyStory(story: IStoryInfo) {
  return agent.put(`${BASE_URL}/stories/${story.id}`).send(story);
}

export function removeStory(storyId: string) {
  return agent.delete(`${BASE_URL}/stories/${storyId}`);
}