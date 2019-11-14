import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const Home: React.FC = () => {
  return <Button><Link to="kanban">sprint backlog</Link></Button>
}

export default Home;