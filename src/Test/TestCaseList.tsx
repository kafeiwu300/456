import React, { useEffect, useState } from 'react';
import { Layout, Icon, Modal, Form, Menu } from 'antd';
import { ITestCase } from './interface';
import TestCaseInfo from './TestCaseInfo';
import useRouter from 'use-react-router';
import { getTestCases, addTestCase, modifyTestCase, deleteTestCase } from '../agent/testCaseAgent';
import TestCaseForm from './TestCaseForm';
import { IStoryInfo } from '../Kanban/interfaces';
import { getProjectStories } from '../agent/storyAgent';

const TestList: React.FC = () => {
  const { match } = useRouter<{
    projectId: string
  }>();
  const { projectId } = match.params;

  const [testCases, setTestCases] = useState<ITestCase[]>([]);
  const [selectedCase, setSelectedCase] = useState<ITestCase>();
  const [stories, setStories] = useState<IStoryInfo[]>([]);

  useEffect(() => {
    // getProjectStories(projectId).then(res => setStories(res.body));
    getTestCases(projectId).then(res => setTestCases(res.body));
  }, [projectId]);

  let testCaseForm: Form;

  const addNewCase = () => {
    Modal.confirm({
      title: '添加测试用例',
      okText: '保存',
      cancelText: '取消',
      icon: <Icon type="plus-circle"/>,
      width: 600,
      content: <TestCaseForm wrappedComponentRef={(form: Form) => testCaseForm = form}/>,
      centered: true,
      onOk: () => {
        (async () => {
          await addTestCase(projectId, testCaseForm.props.form!.getFieldsValue());
          await getTestCases(projectId).then(res => setTestCases(res.body));
        })()
      }
    });
  }

  const modifyCase = (testCase: ITestCase) => {
    Modal.confirm({
      title: '修改测试用例',
      okText: '保存',
      cancelText: '取消',
      icon: <Icon type="plus-circle"/>,
      width: 600,
      content: <TestCaseForm wrappedComponentRef={(form: Form) => testCaseForm = form} initialValue={testCase}/>,
      centered: true,
      onOk: () => {
        (async () => {
          await modifyTestCase(projectId, {...testCase, ...testCaseForm.props.form!.getFieldsValue()});
          await getTestCases(projectId).then(res => setTestCases(res.body));
        })()
      }
    });
  }

  const deleteCase = (caseId: string) => {
    Modal.confirm({
      title: "删除测试用例",
      content: "确定要删除这个测试用例吗？",
      okText: "确定",
      cancelText: "取消",
      width: 600,
      icon: <Icon type="delete" />,
      onOk: () => {
        (async () => {
          await deleteTestCase(caseId);
          await getTestCases(projectId).then(res => setTestCases(res.body));
        })();
      }
    });
  }

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
                <span style={{float: 'right', minWidth: 14}}>
                  <Icon type='edit' onClick={() => {
                    modifyCase(c);
                  }}/>
                  <Icon type='delete' onClick={() => {
                    deleteCase(c.id!);
                  }}/>
                </span>
              </Menu.Item>
            ))
          }
          <Menu.Item onClick={addNewCase}><Icon type='plus'/>新建用例</Menu.Item>
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

export default TestList;