import agent from "./agent";
import { BASE_URL } from "../common/consts";

export function getIterations(projectId: string) {
  return agent.get(`${BASE_URL}/iterations`).query({project_id: projectId, detail: true});
}