import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'antd';

const Home: React.FC = () => {
  const projects = [
    {
      id: 123
    },
    {
      id: 1255
    }
  ]

  return (
    <Row gutter={8}>
      {
        projects.map(((project: {id: number}) => (
          <Col span={6}>
            <Link to={`/project/${project.id}`}>
              <Card title={project.id}/>
            </Link>
          </Col>
        )))
      }
    </Row>
  );
}

export default Home;