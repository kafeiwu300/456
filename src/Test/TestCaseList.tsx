import React, { useEffect, useState } from "react";
import { Icon, Modal, Form, Layout, Menu, Empty, Button } from "antd";
import { ITestCase } from "./interface";
import useRouter from "use-react-router";
import {
  getTestCases,
  addTestCase,
  modifyTestCase,
  deleteTestCase
} from "../agent/testCaseAgent";
import TestCaseForm from "./TestCaseForm";
import TestCaseInfo from "./TestCaseInfo";
import { IStoryInfo } from "../components/Kanban/interfaces";
import { getProjectStories } from "../agent/storyAgent";

const TestCaseList: React.FC = () => {
  const { match } = useRouter<{
    projectId: string;
  }>();
  const { projectId } = match.params;

  const [testCases, setTestCases] = useState<ITestCase[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [stories, setStories] = useState<IStoryInfo[]>([]);

  useEffect(() => {
    // getProjectStories(projectId).then(res => setStories(res.body));
    getTestCases(projectId).then(res => setTestCases(res.body));
    getProjectStories(projectId).then(res => setStories(res.body));
  }, [projectId]);

  let testCaseForm: Form;

  const newCase = () => {
    Modal.confirm({
      title: "添加测试用例",
      okText: "保存",
      cancelText: "取消",
      icon: <Icon type="plus-circle" />,
      width: 600,
      content: (
        <TestCaseForm
          wrappedComponentRef={(form: Form) => (testCaseForm = form)}
          stories={stories}
        />
      ),
      centered: true,
      onOk: () => {
        (async () => {
          await addTestCase(
            projectId,
            testCaseForm.props.form!.getFieldsValue().storyId,
            testCaseForm.props.form!.getFieldsValue()
          );
          await getTestCases(projectId).then(res => setTestCases(res.body));
        })();
      }
    });
  };

  const modifyCase = (testCase: ITestCase) => {
    Modal.confirm({
      title: "修改测试用例",
      okText: "保存",
      cancelText: "取消",
      icon: <Icon type="plus-circle" />,
      width: 600,
      content: (
        <TestCaseForm
          wrappedComponentRef={(form: Form) => (testCaseForm = form)}
          initialValue={testCase}
          stories={stories}
        />
      ),
      centered: true,
      onOk: () => {
        (async () => {
          await modifyTestCase(
            projectId,
            testCaseForm.props.form!.getFieldsValue().storyId,
            {
              ...testCase,
              ...testCaseForm.props.form!.getFieldsValue()
            }
          );
          await getTestCases(projectId).then(res => setTestCases(res.body));
        })();
      }
    });
  };

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
  };

  //TODO: 等待antdesign更新

  return (
    <Layout style={{ height: "100%" }}>
      {testCases.length > 0 ? (
        <>
          <Layout.Sider
            theme="light"
            style={{ height: "100%", overflow: "auto" }}
          >
            <Menu>
              {testCases.map((c: ITestCase, index: number) => (
                <Menu.Item onClick={() => setSelectedIndex(index)}>
                  <span>{c.title}</span>
                  <span style={{ float: "right" }}>
                    <Icon
                      type="edit"
                      onClick={() => {
                        modifyCase(c);
                      }}
                    />
                    <Icon
                      type="delete"
                      onClick={() => {
                        deleteCase(c.id!);
                      }}
                    />
                  </span>
                </Menu.Item>
              ))}
              {newCase ? (
                <Menu.Item onClick={newCase}>
                  <Icon type="plus" />
                  新建用例
                </Menu.Item>
              ) : (
                <></>
              )}
            </Menu>
          </Layout.Sider>
          <Layout.Content style={{ height: "100%", overflow: "auto" }}>
            <TestCaseInfo testCase={testCases[selectedIndex]} />
          </Layout.Content>
        </>
      ) : (
        <Empty>
          <Button onClick={newCase}>新建用例</Button>
        </Empty>
      )}
    </Layout>
  );
};

export default TestCaseList;
