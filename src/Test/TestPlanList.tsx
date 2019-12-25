import React, { useEffect, useState } from "react";
import { Menu, Icon, Modal, Form, Button, Table, Dropdown, Col, Row, Layout } from "antd";
import useRouter from "use-react-router";
import { getTestPlan, addTestPlan, deleteTestPlan, setTestResult, modifyTestPlan } from "../agent/testPlanAgent";
import TestPlanForm from "./TestPlanForm";
import { getTestCases } from "../agent/testCaseAgent";
import { ITestCase, ITestPlanDTO, IDetailedTestPlan, ITestResult } from "./interface";
import TestCaseInfo from "./TestCaseInfo";
import moment from 'moment';
import { Link } from "react-router-dom";

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
  
  //TODO: 等待antdesign更新

  return (
    // <Layout>
    //   <Layout.Sider theme='light'>
    //     <Menu>
    //       {
    //         planList.map((plan: IDetailedTestPlan, index: number) => (
    //           <Menu.Item onClick={() => setSelectedIndex(index)}>
    //             <span>{plan.title}</span>
    //             <span style={{float: 'right'}}>
    //               <Icon type='edit' onClick={() => {
    //                 editPlan({
    //                   id: plan.id,
    //                   title: plan.title,
    //                   caseIds: plan.testResultList.map((result: ITestResult) => result.testCase.id!)
    //                 });
    //               }}/>
    //               <Icon type='delete' onClick={() => {
    //                 deletePlan(plan.id!);
    //               }}/>
    //             </span>
    //           </Menu.Item>
    //         ))
    //       }
    //       <Menu.Item onClick={newTestPlan}><Icon type='plus'/>新建计划</Menu.Item>
    //     </Menu>
    //     {/* <Table 
    //       dataSource={planList} 
    //       footer={() => (
    //         <Button type='link' onClick={newTestPlan} size='small'><Icon type='plus'/>新建计划</Button>
    //       )} 
    //       pagination={false}
    //       onRowClick={(record, index: number) => setSelectedIndex(index)}
    //     >
    //       <Table.Column dataIndex='title' title='标题'/>
    //       <Table.Column title='操作' render={(text, item: IDetailedTestPlan) => (
    //         <>
    //           <Button type='ghost' size='small' shape='circle' icon='edit' className='' onClick={() => editPlan({
    //             id: item.id,
    //             title: item.title,
    //             caseIds: item.testResultList.map((result: ITestResult) => result.testCase.id!)
    //           })}/>
    //           <Button type='ghost' size='small' shape='circle' icon='delete' className='' onClick={() => deletePlan(item.id!)}/>
    //         </>
    //       )}/>
    //     </Table> */}
    //   </Layout.Sider>
    //   <Layout.Content>
    //     <Table dataSource={selectedIndex >= 0 && selectedIndex < planList.length ? planList[selectedIndex].testResultList : undefined}>
    //       <Table.Column dataIndex='testCase.title' title='用例名' render={(text, record: ITestResult) => (
    //         <Button type='link' onClick={() => Modal.info({
    //           content: <TestCaseInfo testCase={record.testCase} />
    //         })}>{text}</Button>
    //       )} />
    //       <Table.Column dataIndex='modifyTime' title='最后修改时间' render={(text: string) => moment(text).format('YYYY-MM-DD HH:mm:ss')}/>
    //       <Table.Column dataIndex='result' title='测试结果' render={(text, record: ITestResult) => (
    //         <Dropdown overlay={(
    //           <Menu>
    //             <Menu.Item onClick={() => setTestResult(record.id, true).then(() => getTestPlan(projectId).then(res => setPlanList(res.body)))}>通过</Menu.Item>
    //             <Menu.Item onClick={() => setTestResult(record.id, false).then(() => getTestPlan(projectId).then(res => setPlanList(res.body)))}>失败</Menu.Item>
    //             <Menu.Item onClick={() => setTestResult(record.id).then(() => getTestPlan(projectId).then(res => setPlanList(res.body)))}>无</Menu.Item>
    //           </Menu>
    //         )}>
    //           <Button type='link'>{text === true ? '通过' : text === false ? '失败' : '无'}<Icon type="down" /></Button>
    //         </Dropdown>)}
    //       />
    //       <Table.Column title='操作' render={(text, record: ITestResult) => (
    //         <Button.Group>
    //           <Button type='danger' onClick={() => modifyTestPlan(planList[selectedIndex].id!, {
    //             caseIds: planList[selectedIndex].testResultList
    //               .map((res: ITestResult) => res.testCase.id!)
    //               .filter((id: string) => id !== record.testCase.id)
    //           }).then(() => getTestPlan(projectId).then(res => setPlanList(res.body)))}><Icon type='delete' />删除</Button>
    //         </Button.Group>
    //       )} />
    //     </Table>
    //   </Layout.Content>
    // </Layout>
    <Table dataSource={planList} title={() => <Button onClick={newTestPlan}>新建测试计划</Button>}>
      <Table.Column title='标题' dataIndex='title' render={(text: string, plan: IDetailedTestPlan) => <Link to={`${match.url}/${plan.id}`}>{text}</Link>}/>
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