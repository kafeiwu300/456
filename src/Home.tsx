import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import useRouter from 'use-react-router';

const Home: React.FC = () => {
  const { match } = useRouter<{
    projectId: string;
  }>();

  const { projectId } = match.params;

  return (
    <>
      <Button><Link to={`/${projectId}/kanban`}>sprint backlog</Link></Button>
      <Button><Link to={`/${projectId}/story-map`}>story map</Link></Button>
      <Button><Link to="bug">bug map</Link></Button>
    </>
  );
}

export default Home;