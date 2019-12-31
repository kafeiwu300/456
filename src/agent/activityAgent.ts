import agent from "./agent";
import { BASE_URL } from "../common/consts";
import moment from "moment";

export function getActivities(
  projectId: string,
  { page, size }: { page?: number; size?: number },
  { from, to }: { from?: number; to?: number }
) {
  return agent
    .get(`${BASE_URL}/activities`)
    .query({ 
      project_id: projectId, 
      page, 
      size, 
      from: from ? moment(from).format('YYYY-MM-DD') : undefined, 
      to: to ? moment(to).format('YYYY-MM-DD') : undefined 
    });
}
