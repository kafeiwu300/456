import { ITestCase } from "./interface";
import React, { useState, useEffect } from "react";
import TestCaseForm from "./TestCaseForm";
import useRouter from "use-react-router";
import { IStoryInfo } from "../Kanban/interfaces";
import { getProjectStories } from "../agent/storyAgent";

const TestCaseInfo: React.FC<{testCase: ITestCase}> = ({testCase}) => {
  const { match } = useRouter<{
    projectId: string
  }>();
  const { projectId } = match.params;

  const [stories, setStories] = useState<IStoryInfo[]>([]);

  useEffect(() => {
    // getProjectStories(projectId).then(res => setStories(res.body));
    getProjectStories(projectId).then(res => setStories(res.body));
  }, [projectId]);

  return (
    // <Descriptions title={testCase.title} bordered>
    //   <Descriptions.Item label='等级'>{testCase.level}</Descriptions.Item>
    //   <Descriptions.Item label='预期结果'>{testCase.expectation}</Descriptions.Item>
    //   <Descriptions.Item label='前置条件' span={3}>{testCase.precondition}</Descriptions.Item>
    //   <Descriptions.Item label='步骤' span={3}>{testCase.procedure}</Descriptions.Item>
    // </Descriptions>
    <TestCaseForm initialValue={testCase} stories={stories} readonly={true}/>
  );
};

export default TestCaseInfo;