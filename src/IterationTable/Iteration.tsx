import React, { useState, useEffect } from "react";
import { Layout, PageHeader, Radio } from "antd";
import Kanban from "../Kanban/Kanban";
import { IIterationInfo } from "../StoryMap/interfaces";
import { connect } from "react-redux";
import { IState } from "../interfaces";
import useRouter from "use-react-router";
import BurnDown from "../BurnDown/BurnDown";
import { store } from "../store";

const Iteration: React.FC<{iteration?: IIterationInfo}> = ({iteration}) => {
  const [content, setContent] = useState<string>('kanban');
  
  const { match, history } = useRouter<{
    projectId: string,
    iterationId: string
  }>();

  const { iterationId } = match.params;

  useEffect(() => {
    store.dispatch({
      type: 'kanban-getData',
      iterationId
    });
  }, [iterationId]);

  return (
    <Layout>
      <PageHeader title={iteration ? iteration.title : '迭代'} onBack={() => {history.goBack()}} extra={
        <Radio.Group buttonStyle="solid" defaultValue={content} onChange={(e) => setContent(e.target.value)}>
          <Radio.Button value='kanban'>看板</Radio.Button>
          <Radio.Button value='burn-down'>燃尽图</Radio.Button>
        </Radio.Group>
      }/>
      <Layout.Content style={{overflowX: 'scroll'}}>
        {content === 'kanban' ? <Kanban/> : <BurnDown/>}
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