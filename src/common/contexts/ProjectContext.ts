import { createContainer } from "unstated-next"
import { IProject } from "../../interfaces";
import { useState, useEffect } from "react";
import { getProject } from "../../agent/projectAgent";

const emptyProject: IProject = {
  id: '',
  name: '',
  description: '',
  teamId: '',
  storyStatusList: [],
  taskStatusList: [],
  bugStatusList: []
};

const useProject = (projectId?: string) => {
  const [project, setProject] = useState<IProject>(emptyProject);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log(projectId);
    if (projectId) {
      setLoading(true);
      getProject(projectId).then(res => setProject(res.body)).finally(() => setLoading(false));
    }
    else
      setProject(emptyProject);
  }, [projectId]);

  return {project, loading};
}

export default createContainer(useProject);