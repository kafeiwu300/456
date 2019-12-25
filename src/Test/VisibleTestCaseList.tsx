import React, { useState } from 'react';
import { Layout, Icon, Menu } from 'antd';
import { ITestCase } from './interface';
import TestCaseInfo from './TestCaseInfo';
import { IStoryInfo } from '../Kanban/interfaces';

const VisibleTestCaseList: React.FC<{
  newCase?: () => void;
  modifyCase?: (testCase: ITestCase) => void;
  deleteCase?: (caseId: string) => void;
  testCases: ITestCase[];
}> = ({newCase, modifyCase, deleteCase, testCases}) => {
  const [selectedCase, setSelectedCase] = useState<ITestCase>();
  const [stories, setStories] = useState<IStoryInfo[]>([]);

  //TODO: 等待antdesign更新

  return (
    <Layout style={{height: '100%'}}>
      <Layout.Sider theme='light' style={{height: '100%', overflow: 'auto'}}>
        <Menu>
          {/* {
            stories.map((story: IStoryInfo) => (
              <Menu.SubMenu title={story.title}>
                {
                  testCases.filter((c: ITestCase) => )
                }
              </Menu.SubMenu>
            ))
          } */}
          {
            testCases.map((c: ITestCase) => (
              <Menu.Item onClick={() => setSelectedCase(c)}>
                <span>{c.title}</span>
                <span style={{float: 'right'}}>
                  {modifyCase ? <Icon type='edit' onClick={() => {
                    modifyCase(c);
                  }}/> : <></>}
                  {deleteCase ? <Icon type='delete' onClick={() => {
                    deleteCase(c.id!);
                  }}/> : <></>}
                </span>
              </Menu.Item>
            ))
          }
          {newCase ? <Menu.Item onClick={newCase}><Icon type='plus'/>新建用例</Menu.Item> : <></>}
        </Menu>
        {/* <Tree.DirectoryTree onSelect={() => {}}>
          <Tree.TreeNode title="用例包">
            {
              data.map((story: IStoryWithCase) => (
                <Tree.TreeNode title={story.title}>
                  {
                    story.testCases.map((testCase: ITestCase) => <Tree.TreeNode title={testCase.title} isLeaf={true}/>)
                  }
                </Tree.TreeNode>
              ))
            }
            {
              testCases.map((c: ITestCase, index: number) => <Tree.TreeNode key={String(index)} title={c.title} isLeaf={true}/>)
            }
          </Tree.TreeNode>
        </Tree.DirectoryTree> */}
      </Layout.Sider>
      <Layout.Content>
        <TestCaseInfo testCase={selectedCase}/>
      </Layout.Content>
    </Layout>
  );
}

export default VisibleTestCaseList;