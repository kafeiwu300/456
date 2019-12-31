import { useState, useEffect } from "react";
import { IBug } from "../../components/Bug/interfaces";
import { createContainer } from "unstated-next";
import {
  getBugs as originalGetBugs,
  addBug as originalAddBug,
  removeBug as originalRemoveBug,
  modifyBug as originalModifyBug,
  moveBug as originalMoveBug
} from "../../agent/bugAgent";

const useBugs = (projectId?: string) => {
  const [bugs, setBugs] = useState<IBug[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (projectId) {
      getBugs(projectId);
    } else {
      setBugs([]);
    }
  }, [projectId]);

  const getBugs = (projectId: string) => {
    setLoading(true);
    originalGetBugs(projectId)
      .then(res => setBugs(res.body))
      .finally(() => setLoading(false));
  };

  const addBug = (bug: IBug) => {
    setLoading(true);
    originalAddBug(projectId!, bug).then(() => getBugs(projectId!));
  };

  const removeBug = (bugId: string) => {
    setLoading(true);
    originalRemoveBug(bugId).then(() => getBugs(projectId!));
  };

  const modifyBug = (bug: IBug) => {
    setLoading(true);
    originalModifyBug(bug).then(() => getBugs(projectId!));
  };

  const moveBug = (bug: IBug, status: string) => {
    setLoading(true);
    originalMoveBug(bug, status).then(() => getBugs(projectId!));
  };

  return { bugs, loading, getBugs, addBug, removeBug, modifyBug, moveBug };
};

export default createContainer(useBugs);
