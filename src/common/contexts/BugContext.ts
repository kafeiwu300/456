import { useState, useEffect } from "react";
import { IBug } from "../../components/Bug/interfaces";
import { createContainer } from "unstated-next"
import { getBugs } from "../../agent/bugAgent";

const useBugs = (projectId?: string) => {
  const [bugs, setBugs] = useState<IBug[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (projectId) {
      setLoading(true);
      getBugs(projectId).then(res => setBugs(res.body)).finally(() => setLoading(false));
    } else {
      setBugs([]);
    }
  }, [projectId]);

  return {bugs, loading};
}

export default createContainer(useBugs);