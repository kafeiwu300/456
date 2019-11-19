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
          <Route path="/story-map" component={StoryMap}/>
          <Route path="/kanban" component={Kanban}/>
          <Route path="/bug" component={Bug}/>
          <Route path="/" component={Home}/>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
