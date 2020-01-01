import React, { useState } from "react";
import { Layout, PageHeader, Radio } from "antd";
import { IIterationInfo } from "../components/StoryMap/interfaces";
import useRouter from "use-react-router";
import BurnDown from "../BurnDown/BurnDown";
import Kanban from "../Routes/Kanban/Kanban";

const Iteration: React.FC<{ iteration: IIterationInfo }> = ({ iteration }) => {
  const [content, setContent] = useState<string>("kanban");

  const { history } = useRouter<{
    projectId: string;
    iterationId: string;
  }>();

  return (
    <Layout style={{ height: "100%" }}>
      <PageHeader
        title={iteration ? iteration.title : "迭代"}
        onBack={history.goBack}
        extra={
          <Radio.Group
            buttonStyle="solid"
            defaultValue={content}
            onChange={e => setContent(e.target.value)}
          >
            <Radio.Button value="kanban">看板</Radio.Button>
            <Radio.Button value="burn-down">燃尽图</Radio.Button>
          </Radio.Group>
        }
      />
      <Layout style={{ height: "100%" }}>
        <Layout.Content style={{ margin: "0 24px", overflow: "auto" }}>
          {content === "kanban" ? (
            <Kanban />
          ) : (
            <BurnDown iteration={iteration} />
          )}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default Iteration;
