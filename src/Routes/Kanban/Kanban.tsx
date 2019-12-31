import { IState } from "../../interfaces";
import VisibleKanban from "../../components/Kanban/Kanban";
import { connect } from "react-redux";
import React from "react";
import KanbanContext from "../../common/contexts/KanbanContext";

export const Kanban: React.FC = () => {
  const {store: stories} = KanbanContext.useContainer();

  return (
    <VisibleKanban stories={stories} />
  );
};

export default connect((state: IState) => ({stories: state.kanbanData}))(VisibleKanban);