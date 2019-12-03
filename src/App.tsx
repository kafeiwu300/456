import React from 'react';
import './App.css';
import Kanban from './Kanban/Kanban';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './Home';
import { Provider } from 'react-redux';
import StoryMap from './StoryMap/StoryMap';
import { store } from './store';
import Bug from './Bug/Bug';
import IterationTable from './IterationTable/IterationTable';
import Log from './Log/Log';
import TestList from './Test/TestList';
import BurnDown from './BurnDown/BurnDown';
import CFD from './CFD/CFD';
import Project from './Project';

const App: React.FC = () => {
  return (  
    <Provider store={store}>
      <Router history={createBrowserHistory()}>
        <Switch>
          <Route path="/:projectId/story-map" component={StoryMap}/>
          <Route path="/:projectId/:iterationId/kanban" component={Kanban}/>
          <Route path="/:projectId/bug" component={Bug}/>
          <Route path="/:projectId/iterations" component={IterationTable}/>
          <Route path="/:projectId/log" component={Log}/>
          <Route path="/:projectId/test-case" component={TestList}/>
          <Route path="/:projectId/burn-down" component={BurnDown}/>
          <Route path="/:projectId/cfd" component={CFD}/>
          <Route path="/:projectId" component={Project}/>
          <Route path="/" component={Home}/>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
