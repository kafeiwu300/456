import { BASE_URL } from "../common/consts";
import agent from "./agent";
import { ITask } from "../Kanban/interfaces";

export function removeTask(taskId: string) {
  return agent.delete(`${BASE_URL}/tasks/${taskId}`);
}

export function modifyTask(task: ITask) {
  return agent.put(`${BASE_URL}/tasks/${task.id}`).send(task);
}

export function addTask(task: ITask) {
  return agent.post(`${BASE_URL}/tasks`).send(task);
}