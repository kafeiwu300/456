import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import useRouter from 'use-react-router';
import IterationTable from './Routes/IterationTable/IterationTable';
import Iteration from './Routes/Iteration/Iteration';
import TestCaseList from './Test/TestCaseList';
import TestPlanList from './Test/TestPlanList';
import BurnDown from './BurnDown/BurnDown';
import CFD from './CFD/CFD';
import { DndProvider } from 'react-dnd';
import HTML5Backend from "react-dnd-html5-backend";
import LayoutRoute from './LayoutRoute';
import ProjectContext from './common/contexts/ProjectContext';
import PlanCaseList from './Test/PlanCaseList';
import Log from './Routes/Log/Log';
import StoryMap from './Routes/StoryMap/StoryMap';
import Bug from './Routes/Bug/Bug';

const Project: React.FC = () => {
  const { match } = useRouter<{
    projectId: string;
    iterationId: string;
  }>();

  const { projectId } = match.params;

  return (
    <Layout style={{height: '100%'}}>
      <Layout.Sider theme='light' breakpoint='lg' collapsedWidth="0" style={{zIndex: 1}}>
        <Menu mode='inline'>
          <Menu.Item>
            <Link to={`/project/${projectId}`}>项目日志</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={`/project/${projectId}/story-map`}>故事地图</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={`/project/${projectId}/iterations`}>迭代</Link>
          </Menu.Item>
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
        <ProjectContext.Provider initialState={projectId}>
          <DndProvider backend={HTML5Backend}>
            <Switch>
              <Route exact path={`${match.path}/story-map`} component={StoryMap}/>
              <LayoutRoute title='缺陷看板' exact path={`${match.path}/bug`} component={Bug}/>
              <LayoutRoute title='迭代列表' exact path={`${match.path}/iterations`} component={IterationTable}/>
              <LayoutRoute title='测试用例' exact path={`${match.path}/test-case`} component={TestCaseList}/>
              <LayoutRoute title='测试计划' exact path={`${match.path}/test-plan`} component={TestPlanList}/>
              <LayoutRoute title='燃尽图' exact path={`${match.path}/burn-down`} component={BurnDown}/>
              <LayoutRoute title='累积流图' exact path={`${match.path}/cfd`} component={CFD}/>
              <Route exact path={`${match.path}/iteration/:iterationId`} component={Iteration}/>
              <Route exact path={`${match.path}/test-plan/:planId`} component={PlanCaseList}/>
              <Route path={`${match.path}`} component={Log}/>
            </Switch>
          </DndProvider>
        </ProjectContext.Provider>
      </Layout.Content>
    </Layout>
  );
}

export default Project;