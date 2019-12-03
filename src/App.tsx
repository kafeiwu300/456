import React from 'react';
import './App.css';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './Home';
import Project from './Project';
import { Layout, Typography } from 'antd';

const App: React.FC = () => {
  return (  
    <Router history={createBrowserHistory()}>
      <Layout>
        <Layout.Header style={{ background: '#fff', paddingTop: 8 }}>
          <Typography.Title level={3}>敏捷实践系统</Typography.Title>
        </Layout.Header>
        <Layout.Content>
          <Route path="/:projectId" component={Project}/>
          <Route exact path="/" component={Home}/>
        </Layout.Content>
      </Layout>
    </Router>
  );
}

export default App;
