import agent from './agent';
import { BASE_URL } from "../common/consts";

export function getProject (projectId: string) {
  return agent.get(`${BASE_URL}/projects/${projectId}`);
}