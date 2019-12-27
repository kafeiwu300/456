import agent from "./agent";
import { BASE_URL } from "../common/consts";
import { IStoryInfo } from "../Kanban/interfaces";

export function getIterationOrphan(projectId: string) {
  return agent.get(`${BASE_URL}/stories/iteration-orphans`).query({project_id: projectId});
}

export function moveStory(story: IStoryInfo, iterationId?: string, epicId?: string) {
  return agent.put(`${BASE_URL}/stories/${story.id}`).send({
    id: story.id,
    iteration: iterationId ? { id: iterationId } : null,
    epic: epicId ? { id: epicId } : null
  });
}

export function addStory(story: IStoryInfo, projectId: string, iterationId?: string, epicId?: string) {
  return agent.post(`${BASE_URL}/stories`).send({
    ...story,
    project: { id: projectId },
    iteration: iterationId ? { id: iterationId } : null,
    epic: epicId ? { id: epicId } : null
  })
}

export function modifyStory(story: IStoryInfo) {
  console.log(story);
  return agent.put(`${BASE_URL}/stories/${story.id}`).send(story);
}

export function removeStory(storyId: string) {
  return agent.delete(`${BASE_URL}/stories/${storyId}`);
}

export function getStories(iterationId: string) {
  return agent.get(`${BASE_URL}/stories`).query({iteration_id: iterationId, detail: true});
}

export function getProjectStories(projectId: string) {
  return agent.get(`${BASE_URL}/stories`).query({project_id: projectId});
}