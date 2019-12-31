import React from "react";
import { IBug } from "../../components/Bug/interfaces";
import { bugReducer } from "../../components/Bug/reducer";

const bugs: IBug[] = [];

const BugContext = React.createContext({
  state: bugs, reducer: bugReducer
});

export default BugContext;