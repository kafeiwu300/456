import React, { useEffect, useState } from 'react';
import { ITestResult } from './interface';
import useRouter from 'use-react-router';
import { getDetailedTestPlan } from '../agent/testPlanAgent';
import { Layout, PageHeader, Menu } from 'antd';
import TestCaseInfo from './TestCaseInfo';

const PlanCaseList: React.FC = () => {
  const { history, match } = useRouter<{
    projectId: string;
    planId: string;
  }>();
  const { projectId, planId } = match.params;

  const [results, setResults] = useState<ITestResult[]>([]);
  const [title, setTitle] = useState<string>();
  const [selectedResult, setSelectedResult] = useState<ITestResult>();

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
                results.map((result: ITestResult) => (
                  <Menu.Item onClick={() => setSelectedResult(result)}>
                    {result.testCase.title}
                  </Menu.Item>
                ))
              }
            </Menu>
          </Layout.Sider>
          <Layout.Content>
            <TestCaseInfo testCase={selectedResult && selectedResult.testCase}/>
          </Layout.Content>
        </Layout>
    </Layout>
  );
}

export default PlanCaseList;