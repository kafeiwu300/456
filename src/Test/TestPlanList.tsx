import React, { useEffect, useState } from "react";
import { Layout, Menu, Icon, Modal, Form } from "antd";
import useRouter from "use-react-router";
import { getTestPlan, addTestPlan } from "../agent/testPlanAgent";
import TestPlanForm from "./TestPlanForm";
import { getTestCases } from "../agent/testCaseAgent";
import { ITestCase, ITestPlan } from "./interface";

const TestPlanList: React.FC = () => {
  const { match } = useRouter<{
    projectId: string
  }>();
  const { projectId } = match.params;

  const [planList, setPlanList] = useState<ITestPlan[]>([]);
  // const [stories, setStories] = useState<IStoryInfo[]>([]);
  const [cases, setCases] = useState<ITestCase[]>([]);

  useEffect(() => {
    getTestPlan(projectId).then(res => setPlanList(res.body));
    // getProjectStories(projectId).then(res => setStories(res.body));
    getTestCases(projectId).then(res => setCases(res.body));
  }, [projectId]);

  let testPlanForm: Form;

  const newTestPlan = () => {
    Modal.confirm({
      title: '新建测试计划',
      okText: '保存',
      cancelText: '取消',
      icon: <Icon type="plus-circle"/>,
      width: 600,
      content: <TestPlanForm wrappedComponentRef={(form: Form) => testPlanForm = form} testCases={cases}/>,
      centered: true,
      onOk: () => {
        console.log(testPlanForm.props.form!.getFieldsValue());
        (async () => {
          await addTestPlan(projectId, testPlanForm.props.form!.getFieldsValue());
          await getTestPlan(projectId).then(res => setPlanList(res.body));
        })();
      }
    });
  }
  
  return (
    <Layout>
      <Layout.Sider>
        <Menu>
          {
            planList.map((plan: ITestPlan) => (
              <Menu.Item>{plan.title}</Menu.Item>
            ))
          }
          <Menu.Item onClick={newTestPlan}><Icon type='plus'/>新建计划</Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout.Content>
      </Layout.Content>
    </Layout>
  );
}

export default TestPlanList;