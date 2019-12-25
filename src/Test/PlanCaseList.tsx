import React, { useEffect, useState } from 'react';
import { ITestResult } from './interface';
import useRouter from 'use-react-router';
import { getDetailedTestPlan } from '../agent/testPlanAgent';
import { Layout, PageHeader, Menu, Button } from 'antd';
import TestCaseInfo from './TestCaseInfo';

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

  return (
    <Layout>
      <PageHeader title={title} onBack={history.goBack}/>
        <Layout style={{height: '100%', margin: '0 24px'}}>
          <Layout.Sider theme='light' style={{height: '100%', overflow: 'auto'}}>
            <Menu>
              {
                results.map((result: ITestResult, index: number) => (
                  <Menu.Item onClick={() => setSelectedIndex(index)}>
                    {result.testCase.title}
                  </Menu.Item>
                ))
              }
            </Menu>
          </Layout.Sider>
          <Layout.Content>
            <TestCaseInfo testCase={selectedIndex >= 0 && selectedIndex < results.length ? results[selectedIndex].testCase : undefined}/>
            {selectedIndex >= 0 && selectedIndex < results.length ? '测试结果：' + results[selectedIndex].result : undefined}
            <Button.Group>
              <Button type='danger'>失败</Button>
              <Button>通过</Button>
              <Button>通过并下一条</Button>
            </Button.Group>
          </Layout.Content>
        </Layout>
    </Layout>
  );
}

export default PlanCaseList;