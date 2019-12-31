import React from "react";
import { kanbanReducer } from "../../components/Kanban/reducer";
import { IStory } from "../../components/Kanban/interfaces";

const stories: IStory[] = [];

const KanbanContext = React.createContext({
  state: stories, reducer: kanbanReducer
});

export default KanbanContext;