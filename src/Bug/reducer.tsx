import { Reducer } from "redux";
import { IBug, IBugAction } from "./interfaces";

export const bugReducer: Reducer<IBug[], IBugAction> = (prevState, action) => {
  let state: IBug[] = prevState ? [...prevState] : [];
  let bug: IBug | undefined;
  switch (action.type) {
    case "bug-addBug":
      state = [...state, action.bug];
      break;
    case "bug-removeBug":
      state = state.filter((s: IBug) => s.id !== action.bug.id);
      break;
    case "bug-modifyBug":
      state = state.map((b: IBug) => (b.id === action.bug.id ? action.bug : b));
      break;
    case "bug-moveBug":
      bug = state.find((b: IBug) => b.id === action.bug.id);
      bug!.state = action.state;
  }
  return state;
};
