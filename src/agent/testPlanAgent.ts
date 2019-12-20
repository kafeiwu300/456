import agent from "./agent";
import { BASE_URL } from "../common/consts";
import { ITestPlanDTO } from "../Test/interface";

export function getTestPlan(projectId: string) {
  return agent.get(`${BASE_URL}/test-plans`).query({project_id: projectId});
}

export function addTestPlan(projectId: string, testPlan: ITestPlanDTO) {
  return agent.post(`${BASE_URL}/test-plans`).send({
    projectId,
    testCaseIdList: testPlan.caseIds,
    testPlanTitle: testPlan.title
  });
}