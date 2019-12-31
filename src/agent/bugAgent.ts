import agent from './agent';
import {BASE_URL} from '../common/consts';
import { IBug } from '../components/Bug/interfaces';
import { BugState } from '../enums';

export function getBugs(projectId: string) {
  return agent.get(`${BASE_URL}/bugs`).query({project_id: projectId});
}

export function addBug(projectId: string, bug: IBug) {
  return agent.post(`${BASE_URL}/bugs`).send({...bug, project: {id: projectId}});
}

export function modifyBug(bug: IBug) {
  return agent.put(`${BASE_URL}/bugs/${bug.id}`).send(bug);
}

export function removeBug(bugId: string) {
  return agent.delete(`${BASE_URL}/bugs/${bugId}`);
}

export function moveBug(bug: IBug, status: BugState) {
  return agent.put(`${BASE_URL}/bugs/${bug.id}`).send({...bug, status})
}