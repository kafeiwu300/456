import { createContainer } from "unstated-next"
import { IProject } from "../../interfaces";
import { useState, useEffect } from "react";
import { getProject } from "../../agent/projectAgent";

const useProject = (projectId?: string) => {
  const emptyProject: IProject = {
    id: '',
    name: '',
    description: '',
    teamId: '',
    storyStatusList: [],
    taskStatusList: [],
    bugStatusList: []
  };

  const [project, setProject] = useState<IProject>(emptyProject);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (projectId) {
      setLoading(true);
      getProject(projectId).then(res => setProject(res.body)).finally(() => setLoading(false));
    }
    else
      setProject(emptyProject);
  }, [emptyProject, projectId]);

  return {project, loading};
}

export default createContainer(useProject);