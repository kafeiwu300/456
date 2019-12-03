import React, { useState } from "react";
import { IIterationInfo } from "../StoryMap/interfaces";
import { connect } from "react-redux";
import { IState } from "../interfaces";
import { Table } from "antd";
import Column from "antd/lib/table/Column";
import useRouter from "use-react-router";
import { Link } from "react-router-dom";

const IterationTable: React.FC<{iterations: IIterationInfo[]}> = ({iterations}) => {
  const { match } = useRouter<{
    projectId: string,
  }>();

  const { projectId } = match.params;

  return (
    <>
      <Table dataSource={iterations} style={{backgroundColor: '#fff'}}>
        <Column title='标题' dataIndex='title' key='title' render={(text: any, record: IIterationInfo) => <Link to={`/project/${projectId}/iteration/${record.id}`}>{record.title}</Link>}/>
        <Column title='迭代目标' dataIndex='target' key='target'/>
        <Column title='负责人' dataIndex='leader' key='leader'/>
        <Column title='开始时间' dataIndex='startTime' key='startTime'/>
        <Column title='结束时间' dataIndex='endTime' key='endTime'/>
      </Table>
    </>
  );
}

export default connect((state: IState) => ({iterations: state.storyMapData.iterations}))(IterationTable);