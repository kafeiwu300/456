import VisibleKanban from "../../components/Kanban/Kanban";
import React from "react";
import KanbanContext from "../../common/contexts/KanbanContext";
import useRouter from "use-react-router";

export const Kanban: React.FC = () => {
  const { stories } = KanbanContext.useContainer();

  return <VisibleKanban stories={stories} />;
};

export default () => {
  const { match } = useRouter<{
    projectId: string;
    iterationId: string;
  }>();

  const { iterationId } = match.params;

  return (
    <KanbanContext.Provider initialState={iterationId}>
      <Kanban />
    </KanbanContext.Provider>
  );
};
