import agent from './agent';
import { BASE_URL } from '../common/consts';
import { ITestCase } from '../Test/interface';

export function getTestCases (projectId: string) {
  return agent.get(`${BASE_URL}/test-cases`).query({project_id: projectId});
}

export function addTestCase (projectId: string, testCase: ITestCase) {
  return agent.post(`${BASE_URL}/test-cases`).send({
    ...testCase,
    project: {id: projectId}
  })
}

export function modifyTestCase (projectId: string, testCase: ITestCase) {
  return agent.put(`${BASE_URL}/test-cases/${testCase.id}`).send({project: {id: projectId}, ...testCase});
}

export function deleteTestCase (caseId: string) {
  return agent.delete(`${BASE_URL}/test-cases/${caseId}`)
}