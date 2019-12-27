import { Reducer } from "redux";
import { IBug, IBugAction } from "./interfaces";
import { store } from "../store";
import { getBugs, addBug, removeBug, modifyBug, moveBug } from "../agent/bugAgent";

const getBugData = async (projectId: string) => {
  const bugs = await getBugs(projectId).then(res => res.body);
  store.dispatch({
    type: 'bug-setData',
    data: bugs
  });
};

export const bugReducer: Reducer<IBug[], IBugAction> = (prevState, action) => {
  let state: IBug[] = prevState ? [...prevState] : [];
  switch (action.type) {
    case "bug-setData":
      state = action.data!;
      break;
    case "bug-getData": 
      getBugData(action.projectId);
      break;
    case "bug-addBug":
      // state = [...state, action.bug];
      addBug(action.projectId, action.bug).then(() => getBugData(action.projectId));
      break;
    case "bug-removeBug":
      // state = state.filter((s: IBug) => s.id !== action.bug.id);
      removeBug(action.bug.id!).then(() => getBugData(action.projectId));
      break;
    case "bug-modifyBug":
      // state = state.map((b: IBug) => (b.id === action.bug.id ? action.bug : b));
      modifyBug(action.bug).then(() => getBugData(action.projectId));
      break;
    case "bug-moveBug":
      // bug = state.find((b: IBug) => b.id === action.bug.id);
      // bug!.status = action.state;
      moveBug(action.bug, action.status).then(() => getBugData(action.projectId));
      break;
  }
  // console.log(state);
  return state;
};
