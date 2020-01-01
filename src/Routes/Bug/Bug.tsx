import VisibleBug from "../../components/Bug/Bug";
import React from "react";
import BugContext from "../../common/contexts/BugContext";
import useRouter from "use-react-router";

const Bug: React.FC = () => {
  const { bugs } = BugContext.useContainer();
  // console.log(bugs);

  return <VisibleBug bugs={bugs} />;
};

export default () => {
  const { match } = useRouter<{
    projectId: string;
  }>();

  const { projectId } = match.params;

  return (
    <BugContext.Provider initialState={projectId}>
      <Bug />
    </BugContext.Provider>
  );
};
