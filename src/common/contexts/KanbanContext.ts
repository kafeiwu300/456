import { useReducer } from "react";
import { kanbanReducer } from "../../components/Kanban/reducer";
import { IStory } from "../../components/Kanban/interfaces";
import { createContainer } from "unstated-next"

const useKanban = (initialState: IStory[] = []) => {
  const [store, dispatch] = useReducer(kanbanReducer, initialState);
  return {
    store, dispatch
  }
}

export default createContainer(useKanban);