import React from 'react';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './Home';
import Project from './Project';
import { Layout, Typography } from 'antd';

const App: React.FC = () => {
  return (
    <Router history={createBrowserHistory()}>
      <Layout style={{height: '100%', width: '100%'}}>
        <Layout.Header style={{ background: '#fff' }}>
          <Typography.Title level={3}>敏捷实践系统</Typography.Title>
        </Layout.Header>
        <Layout.Content style={{height: 'calc(100% - 64px)'}}>
          <Switch>
            <Route path="/project/:projectId" component={Project}/>
            <Route path="/" component={Home}/>
          </Switch>
        </Layout.Content>
      </Layout>
    </Router>
  );
}

export default App;
