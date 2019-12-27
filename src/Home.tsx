import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Layout } from 'antd';

const Home: React.FC = () => {
  const projects = [
    {
      id: '123'
    },
    {
      id: '1255'
    },
    {
      id: 'before_spring'
    }
  ]

  return (
    <Layout style={{margin: 24}}>
      <Row gutter={8}>
        {
          projects.map(((project: {id: string}) => (
            <Col span={6}>
              <Link to={`/project/${project.id}`}>
                <Card title={project.id}/>
              </Link>
            </Col>
          )))
        }
      </Row>
    </Layout>
  );
}

export default Home;