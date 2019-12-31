import { createContainer } from "unstated-next"
import { IProject } from "../../interfaces";
import { useState, useEffect } from "react";
import { getProject } from "../../agent/projectAgent";

const useProject = (projectId?: string) => {
  const [project, setProject] = useState<IProject>({
    id: '',
    name: '',
    description: '',
    teamId: '',
    storyStatusList: [],
    taskStatusList: [],
    bugStatusList: []
  });

  useEffect(() => {
    if (projectId)
      getProject(projectId).then(res => setProject(res.body));
    else
      setProject({
        id: '',
        name: '',
        description: '',
        teamId: '',
        storyStatusList: [],
        taskStatusList: [],
        bugStatusList: []
      });
  }, [projectId]);

  return project;
}

export default createContainer(useProject);