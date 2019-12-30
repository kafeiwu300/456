import agent from './agent';
import { BASE_URL } from "../common/consts";

export function getActivities (projectId: string, {page, size}: {page?: number, size?: number}, {from, to}: {from?: number, to?: number}) {
  return agent.get(`${BASE_URL}/activities`).query({project_id: projectId, page, size, from, to});
}