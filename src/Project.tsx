import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import useRouter from 'use-react-router';

const Project: React.FC = () => {
  const { match } = useRouter<{
    projectId: string;
  }>();

  const { projectId } = match.params;

  return (
    <>
      <Button><Link to={`/${projectId}/1/kanban`}>sprint backlog</Link></Button>
      <Button><Link to={`/${projectId}/story-map`}>story map</Link></Button>
      <Button><Link to={`/${projectId}/iterations`}>iterations</Link></Button>
      <Button><Link to={`/${projectId}/log`}>log</Link></Button>
      <Button><Link to={`/${projectId}/bug`}>bug map</Link></Button>
      <Button><Link to={`/${projectId}/test-case`}>test cases</Link></Button>
      <Button><Link to={`/${projectId}/burn-down`}>burn down</Link></Button>
      <Button><Link to={`/${projectId}/cfd`}>cfd</Link></Button>
    </>
  );
}

export default Project;