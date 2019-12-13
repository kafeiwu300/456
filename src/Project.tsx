import React, { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import useRouter from 'use-react-router';
import StoryMap from './StoryMap/StoryMap';
import Bug from './Bug/Bug';
import IterationTable from './IterationTable/IterationTable';
import Iteration from './IterationTable/Iteration';
import Log from './Log/Log';
import TestList from './Test/TestList';
import BurnDown from './BurnDown/BurnDown';
import CFD from './CFD/CFD';
import { Provider } from 'react-redux';
import { store } from './store';
import { DndProvider } from 'react-dnd';
import HTML5Backend from "react-dnd-html5-backend";
import LayoutRoute from './LayoutRoute';
import { getProject } from './agent/projectAgent';
import { IProject } from './interfaces';
import ProjectContext from './common/contexts/ProjectContext';

const Project: React.FC = () => {
  const { match } = useRouter<{
    projectId: string;
    iterationId: string;
  }>();

  const { projectId } = match.params;

  const [project, setProject] = useState<IProject>({
    id: '',
    name: '',
    description: '',
    teamId: '',
    storyStatusList: [],
    taskStatusList: [],
    bugStatusList: []
  });

  useEffect(() => {
    // store.dispatch({
    //   type: 'project-getData',
    //   projectId
    // });
    store.dispatch({
      type: 'storyMap-getData',
      projectId
    });
    store.dispatch({
      type: 'bug-getData',
      projectId
    });
    getProject(projectId).then(res => setProject(res.body));
  }, [projectId]);

  return (
    <Layout style={{height: '100%'}}>
      <Layout.Sider theme='light'>
        <Menu mode='inline'>
          <Menu.Item>
            <Link to={`/project/${projectId}/story-map`}>故事地图</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={`/project/${projectId}/iterations`}>迭代</Link>
          </Menu.Item>
          {/* <Menu.Item>
            <Link to={`/project/${projectId}/log`}>log</Link>
          </Menu.Item> */}
          <Menu.Item>
            <Link to={`/project/${projectId}/bug`}>缺陷看板</Link>
          </Menu.Item>
          <Menu.SubMenu title='测试'>
            <Menu.Item>
              <Link to={`/project/${projectId}/test-case`}>测试用例</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to={`/project/${projectId}/test-plan`}>测试计划</Link>
            </Menu.Item>
          </Menu.SubMenu>
          {/* <Menu.Item>
            <Link to={`/project/${projectId}/burn-down`}>burn down</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={`/project/${projectId}/cfd`}>cfd</Link>
          </Menu.Item> */}
        </Menu>
      </Layout.Sider>
      <Layout.Content style={{height: '100%', width: 'calc(100% - 200px)'}}>
        <Provider store={store}>
          <ProjectContext.Provider value={project}>
            <DndProvider backend={HTML5Backend}>
              <Switch>
                <Route title='故事地图' exact path={`${match.path}/story-map`} component={StoryMap}/>
                <LayoutRoute title='缺陷看板' exact path={`${match.path}/bug`} component={Bug}/>
                <LayoutRoute title='迭代列表' exact path={`${match.path}/iterations`} component={IterationTable}/>
                <LayoutRoute title='项目日志' exact path={`${match.path}/log`} component={Log}/>
                <LayoutRoute title='测试' exact path={`${match.path}/test-case`} component={TestList}/>
                <LayoutRoute title='燃尽图' exact path={`${match.path}/burn-down`} component={BurnDown}/>
                <LayoutRoute title='累积流图' exact path={`${match.path}/cfd`} component={CFD}/>
                <Route exact path={`${match.path}/iteration/:iterationId`} component={Iteration}/>
              </Switch>
            </DndProvider>
          </ProjectContext.Provider>
        </Provider>
      </Layout.Content>
    </Layout>
  );
}

export default Project;