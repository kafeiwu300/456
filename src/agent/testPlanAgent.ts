import agent from "./agent";
import { BASE_URL } from "../common/consts";
import { ITestPlanDTO } from "../Test/interface";

export function getTestPlan(projectId: string) {
  return agent.get(`${BASE_URL}/test-plans`).query({project_id: projectId, 'test-case': true});
}

export function getDetailedTestPlan(planId: string) {
  return agent.get(`${BASE_URL}/test-plans/${planId}`);
}

export function addTestPlan(projectId: string, testPlan: ITestPlanDTO) {
  return agent.post(`${BASE_URL}/test-plans`).send({
    projectId,
    testCaseIdList: testPlan.caseIds,
    testPlanTitle: testPlan.title
  });
}

export function modifyTestPlan(planId: string, testPlan: ITestPlanDTO) {
  return agent.put(`${BASE_URL}/test-plans/${planId}`).send({
    testCaseIdList: testPlan.caseIds,
    testPlanTitle: testPlan.title
  });
}

export function setTestResult(resultId: string, result?: boolean) {
  return agent.put(`${BASE_URL}/test-results/${resultId}`).send({result: result === undefined ? null : result});
}

export function deleteTestPlan(planId: string) {
  return agent.delete(`${BASE_URL}/test-plans/${planId}`);
}