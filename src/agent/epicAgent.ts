import agent from "./agent";
import { BASE_URL } from "../common/consts";
import { IEpicInfo } from "../components/StoryMap/interfaces";

export function getEpics(projectId: string) {
  return agent.get(`${BASE_URL}/epics`).query({project_id: projectId, detail: false});
}

export function addEpic(projectId: string, epic: IEpicInfo) {
  return agent.post(`${BASE_URL}/epics`).send({
    project: { id: projectId },
    ...epic
  });
}

export function modifyEpic(epic: IEpicInfo) {
  return agent.put(`${BASE_URL}/epics/${epic.id}`).send(epic);
}

export function removeEpic(epicId: string) {
  return agent.delete(`${BASE_URL}/epics/${epicId}`);
}