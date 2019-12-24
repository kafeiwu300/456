import { ITestCase } from "./interface";
import { Descriptions } from "antd";
import React from "react";
import TestCaseForm from "./TestCaseForm";

const TestCaseInfo: React.FC<{testCase?: ITestCase}> = ({testCase}) => {
  return testCase ? (
    // <Descriptions title={testCase.title} bordered>
    //   <Descriptions.Item label='等级'>{testCase.level}</Descriptions.Item>
    //   <Descriptions.Item label='预期结果'>{testCase.expectation}</Descriptions.Item>
    //   <Descriptions.Item label='前置条件' span={3}>{testCase.precondition}</Descriptions.Item>
    //   <Descriptions.Item label='步骤' span={3}>{testCase.procedure}</Descriptions.Item>
    // </Descriptions>
    <TestCaseForm initialValue={testCase}/>
  ) : <></>;
};

export default TestCaseInfo;