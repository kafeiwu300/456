import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import useRouter from 'use-react-router';
import StoryMap from './StoryMap/StoryMap';
import Kanban from './Kanban/Kanban';
import Bug from './Bug/Bug';
import IterationTable from './IterationTable/IterationTable';
import Log from './Log/Log';
import TestList from './Test/TestList';
import BurnDown from './BurnDown/BurnDown';
import CFD from './CFD/CFD';
import { Provider } from 'react-redux';
import { store } from './store';
import { DndProvider } from 'react-dnd';
import HTML5Backend from "react-dnd-html5-backend";

const Project: React.FC<{children: React.ReactNode}> = ({children}) => {
  const { match } = useRouter<{
    projectId: string;
  }>();

  console.log(children)

  const { projectId } = match.params;

  return (
    <Layout style={{height: '100%'}}>
      <Layout.Sider theme='light'>
        <Menu mode='inline'>
          <Menu.Item>
            <Link to={`/${projectId}/1/kanban`}>sprint backlog</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={`/${projectId}/story-map`}>story map</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={`/${projectId}/iterations`}>iterations</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={`/${projectId}/log`}>log</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={`/${projectId}/bug`}>bug map</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={`/${projectId}/test-case`}>test cases</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={`/${projectId}/burn-down`}>burn down</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={`/${projectId}/cfd`}>cfd</Link>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout.Content style={{overflowX: 'scroll', overflowY: 'scroll'}}>
        <Provider store={store}>
          <DndProvider backend={HTML5Backend}>
            <Route exact path={`${match.path}/story-map`} component={StoryMap}/>
            <Route exact path={`${match.path}/:iterationId/kanban`} component={Kanban}/>
            <Route exact path={`${match.path}/bug`} component={Bug}/>
            <Route exact path={`${match.path}/iterations`} component={IterationTable}/>
            <Route exact path={`${match.path}/log`} component={Log}/>
            <Route exact path={`${match.path}/test-case`} component={TestList}/>
            <Route exact path={`${match.path}/burn-down`} component={BurnDown}/>
            <Route exact path={`${match.path}/cfd`} component={CFD}/>
          </DndProvider>
        </Provider>
      </Layout.Content>
    </Layout>
  );
}

export default Project;