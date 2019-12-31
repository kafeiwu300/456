import agent from "./agent";
import { BASE_URL } from "../common/consts";
import { IIterationInfo } from "../components/StoryMap/interfaces";

export function getIterations(projectId: string) {
  return agent.get(`${BASE_URL}/iterations`).query({project_id: projectId, detail: true});
}

export function modifyIteration(iteration: IIterationInfo, projectId: string) {
  return agent.put(`${BASE_URL}/iterations/${iteration.id}`).send({...iteration, project: {id: projectId}});
}

export function addIteration(iteration: IIterationInfo, projectId: string) {
  return agent.post(`${BASE_URL}/iterations`).send({...iteration, project: {id: projectId}});
}

export function removeIteration(iterationId: string) {
  return agent.delete(`${BASE_URL}/iterations/${iterationId}`);
}