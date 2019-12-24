import React, { useEffect, useState } from "react";
import { Layout, Menu, Icon, Modal, Form, Button, Table, Dropdown, Col, Row } from "antd";
import useRouter from "use-react-router";
import { getTestPlan, addTestPlan, deleteTestPlan, setTestResult, getDetailedTestPlan, modifyTestPlan } from "../agent/testPlanAgent";
import TestPlanForm from "./TestPlanForm";
import { getTestCases } from "../agent/testCaseAgent";
import { ITestCase, ITestPlanDTO, IDetailedTestPlan, ITestResult } from "./interface";
import TestCaseInfo from "./TestCaseInfo";

const TestPlanList: React.FC = () => {
  const { match } = useRouter<{
    projectId: string
  }>();
  const { projectId } = match.params;

  const [planList, setPlanList] = useState<IDetailedTestPlan[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
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
      width: 1200,
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

  const editPlan = (plan: ITestPlanDTO) => {
    Modal.confirm({
      title: '修改测试计划',
      okText: '保存',
      cancelText: '取消',
      icon: <Icon type="edit" />,
      width: 1200,
      content: <TestPlanForm wrappedComponentRef={(form: Form) => testPlanForm = form} testCases={cases} initialValue={plan}/>,
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
    <Row gutter={16}>
      <Col span={8}>
        <Table 
          dataSource={planList} 
          footer={() => (
            <Button type='link' onClick={newTestPlan} size='small'><Icon type='plus'/>新建计划</Button>
          )} 
          pagination={false}
          onRowClick={(record, index: number) => setSelectedIndex(index)}
        >
          <Table.Column dataIndex='title' title='标题'/>
          <Table.Column title='操作' render={(text, item: IDetailedTestPlan) => (
            <>
              <Button type='ghost' size='small' shape='circle' icon='edit' className='' onClick={() => editPlan({
                id: item.id,
                title: item.title,
                caseIds: item.testResultList.map((result: ITestResult) => result.testCase.id!)
              })}/>
              <Button type='ghost' size='small' shape='circle' icon='delete' className='' onClick={() => deletePlan(item.id!)}/>
            </>
          )}/>
        </Table>
      </Col>
      <Col span={16}>
        <Table dataSource={selectedIndex >= 0 && selectedIndex < planList.length ? planList[selectedIndex].testResultList : undefined}>
          <Table.Column dataIndex='testCase.title' title='用例名' render={(text, record: ITestResult) => (
            <Button type='link' onClick={() => Modal.info({
              content: <TestCaseInfo testCase={record.testCase} />
            })}>{text}</Button>
          )} />
          <Table.Column dataIndex='result' title='测试结果' render={(text, record: ITestResult) => (
            <Dropdown overlay={(
              <Menu>
                <Menu.Item onClick={() => setTestResult(record.id, true).then(() => getTestPlan(projectId).then(res => setPlanList(res.body)))}>通过</Menu.Item>
                <Menu.Item onClick={() => setTestResult(record.id, false).then(() => getTestPlan(projectId).then(res => setPlanList(res.body)))}>失败</Menu.Item>
                <Menu.Item onClick={() => setTestResult(record.id).then(() => getTestPlan(projectId).then(res => setPlanList(res.body)))}>无</Menu.Item>
              </Menu>
            )}>
              <Button type='link'>{text === true ? '通过' : text === false ? '失败' : '无'}<Icon type="down" /></Button>
            </Dropdown>)}
          />
          <Table.Column title='操作' render={(text, record: ITestResult) => (
            <Button.Group>
              <Button type='danger' onClick={() => modifyTestPlan(planList[selectedIndex].id!, {
                caseIds: planList[selectedIndex].testResultList
                  .map((res: ITestResult) => res.testCase.id!)
                  .filter((id: string) => id !== record.testCase.id)
              }).then(() => getTestPlan(projectId).then(res => setPlanList(res.body)))}><Icon type='delete' />删除</Button>
            </Button.Group>
          )} />
        </Table>
      </Col>
    </Row>
  );
}

export default TestPlanList;