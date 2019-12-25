import { ITestResult } from "./interface";
import React from "react";
import TestCaseInfo from "./TestCaseInfo";
import { Row, Col, Icon } from "antd";

const ResultfulTestCaseInfo: React.FC<{ testResult: ITestResult }> = ({ testResult }) => {
  return (
    // <Descriptions title={testCase.title} bordered>
    //   <Descriptions.Item label='等级'>{testCase.level}</Descriptions.Item>
    //   <Descriptions.Item label='预期结果'>{testCase.expectation}</Descriptions.Item>
    //   <Descriptions.Item label='前置条件' span={3}>{testCase.precondition}</Descriptions.Item>
    //   <Descriptions.Item label='步骤' span={3}>{testCase.procedure}</Descriptions.Item>
    // </Descriptions>
    <>
      <TestCaseInfo testCase={testResult.testCase} />
      <Row>
        <Col span={4} style={{ textAlign: 'right' }}>测试结果：</Col>
        <Col>
          {
            testResult.result ? <><Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> 通过</> : (
              testResult.result === null ? (
                <>
                  <Icon type="question-circle" theme='twoTone' twoToneColor='#faad14' /> 无
                </>
              ) : (
                <>
                  <Icon type="close-circle" theme='twoTone' twoToneColor='#f5222d' /> 失败
                </>
              )
            )
          }
        </Col>
      </Row>
    </>
  );
};

export default ResultfulTestCaseInfo;