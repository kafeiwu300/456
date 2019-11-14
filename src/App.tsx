import React from 'react';
import './App.css';
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from 'react-dnd';
import { Provider } from 'react-redux';
import store from './Kanban/store';
import Kanban from './Kanban/Kanban';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './Home';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Router history={createBrowserHistory()}>
          <Switch>
            <Route path="/kanban" component={Kanban}/>
            <Route path="/" component={Home}/>
          </Switch>
        </Router>
      </DndProvider>
    </Provider>
  );
}

export default App;
