import { connect } from "react-redux";
import { IState } from "../../interfaces";
import VisibleBug from "../../components/Bug/Bug";
import React from 'react';
import BugContext from "../../common/contexts/BugContext";

export const Bug: React.FC = () => {
  const {bugs} = BugContext.useContainer();

  return (
    <VisibleBug bugs={bugs}/>
  );
}

// redux
export default connect((state: IState) => ({ bugs: state.bugData }))(VisibleBug);