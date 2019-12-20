import { ITestCase } from "./interface";
import { Descriptions } from "antd";
import React from "react";

const TestCaseInfo: React.FC<{testCase: ITestCase}> = ({testCase}) => {
  return (
    <Descriptions>
      <Descriptions.Item label='名称'>{testCase.title}</Descriptions.Item>
      <Descriptions.Item label='步骤'>{testCase.procedure}</Descriptions.Item>
      <Descriptions.Item label='前置条件'>{testCase.precondition}</Descriptions.Item>
      <Descriptions.Item label='预期结果'>{testCase.expectation}</Descriptions.Item>
      <Descriptions.Item label='等级'>{testCase.level}</Descriptions.Item>
    </Descriptions>
  );
};

export default TestCaseInfo;