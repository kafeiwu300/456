import React, { useEffect, useState } from 'react';
import { Layout, Menu, Icon, Modal, Form } from 'antd';
import { ITestCase } from './interface';
import TestCaseInfo from './TestCaseInfo';
import useRouter from 'use-react-router';
import { getTestCases, addTestCase } from '../agent/testCaseAgent';
import TestCaseForm from './TestCaseForm';

const TestList: React.FC = () => {
  const { match } = useRouter<{
    projectId: string
  }>();
  const { projectId } = match.params;

  const [testCases, setTestCases] = useState<ITestCase[]>([]);
  const [selectedCase, setSelectedCase] = useState<ITestCase>({});

  useEffect(() => {
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

  return (
    <Layout style={{height: '100%'}}>
      <Layout.Sider theme='light' style={{height: '100%', overflow: 'auto'}}>
        <Menu>
          {
            testCases.map((c: ITestCase) => <Menu.Item onClick={() => setSelectedCase(c)}>{c.title}</Menu.Item>)
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