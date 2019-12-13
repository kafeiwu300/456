import React from "react";
import { IProject } from "../../interfaces";

const project: IProject = {
  id: '',
  name: '',
  description: '',
  teamId: '',
  storyStatusList: [],
  taskStatusList: [],
  bugStatusList: []
};
const ProjectContext = React.createContext(project);

export default ProjectContext;