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

const App: React.FC = () => {
  return (  
    <Provider store={store}>
      <Router history={createBrowserHistory()}>
        <Switch>
<<<<<<< HEAD
          <Route path="/:projectId/:iterationId/story-map" component={StoryMap}/>
          <Route path="/:projectId/kanban" component={Kanban}/>
          <Route path="/:projectId" component={Home}/>
=======
          <Route path="/story-map" component={StoryMap}/>
          <Route path="/kanban" component={Kanban}/>
          <Route path="/bug" component={Bug}/>
          <Route path="/" component={Home}/>
>>>>>>> d7d9ba5acec1a1ea1a35a4fb6d2e4a1caf0bcba0
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
