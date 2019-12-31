import { useReducer } from "react";
import { IBug } from "../../components/Bug/interfaces";
import { bugReducer } from "../../components/Bug/reducer";
import { createContainer } from "unstated-next"

const useBugs = (initialState: IBug[] = []) => {
  const [store, dispatch] = useReducer(bugReducer, initialState);
  return {
    store, dispatch
  };
};

export default createContainer(useBugs);