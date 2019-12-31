import { IState } from "../../interfaces";
import VisibleKanban from "../../components/Kanban/Kanban";
import { connect } from "react-redux";
import React, { useContext } from "react";
import KanbanContext from "../../common/contexts/KanbanContext";

export const Kanban: React.FC = () => {
  const {state: stories} = useContext(KanbanContext);

  return (
    <VisibleKanban stories={stories} />
  );
};

export default connect((state: IState) => ({stories: state.kanbanData}))(VisibleKanban);