import React, { useState } from "react";
import { Layout, PageHeader, Switch } from "antd";
import Kanban from "../Kanban/Kanban";
import { IIterationInfo } from "../StoryMap/interfaces";
import { connect } from "react-redux";
import { IState } from "../interfaces";
import useRouter from "use-react-router";
import BurnDown from "../BurnDown/BurnDown";

const Iteration: React.FC<{iteration?: IIterationInfo}> = ({iteration}) => {
  const { history } = useRouter<{
    projectId: string,
    iterationId: string
  }>();

  const [showKanban, setShowKanban] = useState<boolean>(true);

  return (
    <Layout>
      <PageHeader title={iteration ? iteration.title : '迭代'} onBack={() => {history.goBack()}} extra={<Switch checkedChildren='看板' unCheckedChildren='燃尽图' defaultChecked onChange={() => setShowKanban(!showKanban)}/>}/>
      <Layout.Content>
        {showKanban ? <Kanban/> : <BurnDown/>}
      </Layout.Content>
    </Layout>
  );
};

const I = connect((state: IState, ownProps: {iterationId: string}) => ({iteration: state.storyMapData.iterations.find((iteration: IIterationInfo) => iteration.id === ownProps.iterationId)}))(Iteration);

const A: React.FC = () => {
  const { match } = useRouter<{
    projectId: string,
    iterationId: string
  }>();

  const { iterationId } = match.params;

  return <I iterationId={iterationId}></I>;
}

export default A;