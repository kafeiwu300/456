import React, { useEffect, useState } from "react";
import { Icon, Modal, Form, Button, Table } from "antd";
import useRouter from "use-react-router";
import { getTestPlan, addTestPlan, deleteTestPlan, modifyTestPlan } from "../agent/testPlanAgent";
import TestPlanForm from "./TestPlanForm";
import { getTestCases } from "../agent/testCaseAgent";
import { ITestCase, ITestPlanDTO, IDetailedTestPlan, ITestResult } from "./interface";
import moment from 'moment';
import { Link } from "react-router-dom";

const TestPlanList: React.FC = () => {
  const { match } = useRouter<{
    projectId: string
  }>();
  const { projectId } = match.params;

  const [planList, setPlanList] = useState<IDetailedTestPlan[]>([]);
  const [cases, setCases] = useState<ITestCase[]>([]);

  useEffect(() => {
    getTestPlan(projectId).then(res => setPlanList(res.body));
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
        (async () => {
          await addTestPlan(projectId, testPlanForm.props.form!.getFieldsValue());
          await getTestPlan(projectId).then(res => setPlanList(res.body));
        })();
      }
    });
  }

  const editPlan = (plan: IDetailedTestPlan) => {
    const planDto: ITestPlanDTO = {
      id: plan.id,
      title: plan.title,
      caseIds: plan.testResultList.map((result: ITestResult) => result.testCase.id!)
    };
    Modal.confirm({
      title: '修改测试计划',
      okText: '保存',
      cancelText: '取消',
      icon: <Icon type="edit" />,
      width: 600,
      content: <TestPlanForm wrappedComponentRef={(form: Form) => testPlanForm = form} testCases={cases} initialValue={planDto}/>,
      centered: true,
      onOk: () => {
        (async () => {
          await modifyTestPlan(plan.id!, testPlanForm.props.form!.getFieldsValue());
          await getTestPlan(projectId).then(res => setPlanList(res.body));
        })();
      }
    });
  }

  const deletePlan = (planId: string) => {
    Modal.confirm({
      title: "删除测试计划",
      content: "确定要删除这个测试计划吗？",
      okText: "确定",
      cancelText: "取消",
      width: 600,
      icon: <Icon type="delete" />,
      onOk: () => {
        (async () => {
          await deleteTestPlan(planId);
          await getTestPlan(projectId).then(res => setPlanList(res.body));
        })();
      }
    });
  }

  return (
    <Table dataSource={planList} title={() => <Button onClick={newTestPlan}>新建测试计划</Button>}>
      <Table.Column title='标题' dataIndex='title' render={(text: string, plan: IDetailedTestPlan) => 
        <>
          <Link to={`${match.url}/${plan.id}`}>
            {text}
          </Link>
          {plan.referredProject ? (
            <Link to={`#`}>
              <Icon type="link" />
            </Link>
          ) : <></>}
        </>
      }/>
      <Table.Column title='最后修改时间' dataIndex='modifyTime' render={(text: string) => moment(text).format('YYYY-MM-DD HH:mm:ss')}/>
      <Table.Column title='通过率' dataIndex='passRate'/>
      <Table.Column title='操作' render={(text, plan: IDetailedTestPlan) => (
        <Button.Group>
          <Button onClick={() => editPlan(plan)}>修改</Button>
          <Button type='danger' onClick={() => deletePlan(plan.id!)}>删除</Button>
        </Button.Group>
      )}/>
    </Table>
  );
}

export default TestPlanList;