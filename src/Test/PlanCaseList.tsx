import React, { useEffect, useState } from 'react';
import { ITestResult } from './interface';
import useRouter from 'use-react-router';
import { getDetailedTestPlan, setTestResult } from '../agent/testPlanAgent';
import { Layout, PageHeader, Menu, Button, Empty, Row, Col, Icon } from 'antd';
import ResultfulTestCaseInfo from './ResultfulTestCaseInfo';

const PlanCaseList: React.FC = () => {
  const { history, match } = useRouter<{
    projectId: string;
    planId: string;
  }>();
  const { projectId, planId } = match.params;

  const [results, setResults] = useState<ITestResult[]>([]);
  const [title, setTitle] = useState<string>();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    getDetailedTestPlan(planId).then(res => {
      setTitle(res.body.title);
      setResults(res.body.testResultList);
    });
  }, [projectId]);

  const setCaseResult = (resultId: string, result?: boolean) => {
    (async () => {
      await setTestResult(resultId, result);
      await getDetailedTestPlan(planId).then(res => {
        setTitle(res.body.title);
        setResults(res.body.testResultList);
      });
    })();
  }

  return (
    <Layout style={{height: '100%'}}>
      <PageHeader title={title} onBack={history.goBack}/>
      <Layout style={{height: '100%', margin: '0 24px'}}>
        {results.length > 0 ? (
          <>
            <Layout.Sider theme='light' style={{height: '100%', overflow: 'auto'}}>
              <Menu selectedKeys={[selectedIndex.toString()]}>
                {
                  results.map((result: ITestResult, index: number) => (
                    <Menu.Item onClick={() => setSelectedIndex(index)} key={index.toString()}>
                      {result.result === false ? <Icon type="close-circle" theme='twoTone' twoToneColor='#f5222d' /> : (
                        result.result === true ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> : <></>
                      )} 
                      {result.testCase.title}
                    </Menu.Item>
                  ))
                }
              </Menu>
            </Layout.Sider>
            <Layout.Content style={{height: '100%', overflow: 'auto'}}>
              <ResultfulTestCaseInfo testResult={results[selectedIndex]}/>
              <Row>
                <Col span={20} style={{textAlign: 'right'}}>
                  <Button.Group>
                    <Button type='danger' onClick={() => {setCaseResult(results[selectedIndex].id, false)}}>失败</Button>
                    <Button onClick={() => {setCaseResult(results[selectedIndex].id, true)}}>通过</Button>
                    <Button onClick={() => {
                      setCaseResult(results[selectedIndex].id, true)
                      setSelectedIndex(selectedIndex + 1);
                    }} disabled={selectedIndex === results.length - 1}>通过并下一条</Button>
                  </Button.Group>
                </Col>
              </Row>
            </Layout.Content>
          </>
        ) : <Empty/>}
      </Layout>
    </Layout>
  );
}

export default PlanCaseList;