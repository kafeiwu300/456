import React from 'react';
import './App.css';
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from 'react-dnd';
import { Provider } from 'react-redux';
import store from './store';
import Kanban from './Kanban';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Kanban/>
      </DndProvider>
    </Provider>
  );
}

export default App;
