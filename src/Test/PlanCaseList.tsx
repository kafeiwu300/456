import React, { useEffect, useState } from 'react';
import { ITestCase, ITestResult } from './interface';
import useRouter from 'use-react-router';
import { getDetailedTestPlan } from '../agent/testPlanAgent';
import VisibleTestCaseList from './VisibleTestCaseList';
import { Layout, PageHeader } from 'antd';

const PlanCaseList: React.FC = () => {
  const { history, match } = useRouter<{
    projectId: string;
    planId: string;
  }>();
  const { projectId, planId } = match.params;

  const [testCases, setTestCases] = useState<ITestCase[]>([]);
  const [title, setTitle] = useState<string>();

  useEffect(() => {
    // getProjectStories(projectId).then(res => setStories(res.body));
    // getTestCases(projectId).then(res => setTestCases(res.body));
    getDetailedTestPlan(planId).then(res => {
      setTitle(res.body.title);
      setTestCases(res.body.testResultList.map((result: ITestResult) => result.testCase))
    });
  }, [projectId]);

  //TODO: 等待antdesign更新

  return (
    // <Layout style={{height: '100%'}}>
    //   <Layout.Sider theme='light' style={{height: '100%', overflow: 'auto'}}>
    //     <Menu>
    //       {/* {
    //         stories.map((story: IStoryInfo) => (
    //           <Menu.SubMenu title={story.title}>
    //             {
    //               testCases.filter((c: ITestCase) => )
    //             }
    //           </Menu.SubMenu>
    //         ))
    //       } */}
    //       {
    //         testCases.map((c: ITestCase) => (
    //           <Menu.Item onClick={() => setSelectedCase(c)}>
    //             <span>{c.title}</span>
    //             <span style={{float: 'right'}}>
    //               <Icon type='edit' onClick={() => {
    //                 modifyCase(c);
    //               }}/>
    //               <Icon type='delete' onClick={() => {
    //                 deleteCase(c.id!);
    //               }}/>
    //             </span>
    //           </Menu.Item>
    //         ))
    //       }
    //       <Menu.Item onClick={newCase}><Icon type='plus'/>新建用例</Menu.Item>
    //     </Menu>
    //     {/* <Tree.DirectoryTree onSelect={() => {}}>
    //       <Tree.TreeNode title="用例包">
    //         {
    //           data.map((story: IStoryWithCase) => (
    //             <Tree.TreeNode title={story.title}>
    //               {
    //                 story.testCases.map((testCase: ITestCase) => <Tree.TreeNode title={testCase.title} isLeaf={true}/>)
    //               }
    //             </Tree.TreeNode>
    //           ))
    //         }
    //         {
    //           testCases.map((c: ITestCase, index: number) => <Tree.TreeNode key={String(index)} title={c.title} isLeaf={true}/>)
    //         }
    //       </Tree.TreeNode>
    //     </Tree.DirectoryTree> */}
    //   </Layout.Sider>
    //   <Layout.Content>
    //     <TestCaseInfo testCase={selectedCase}/>
    //   </Layout.Content>
    // </Layout>
    <Layout>
      <PageHeader title={title} onBack={history.goBack}/>
      <div style={{margin: '0 24px'}}>
        <VisibleTestCaseList testCases={testCases}/>
      </div>
    </Layout>
  );
}

export default PlanCaseList;