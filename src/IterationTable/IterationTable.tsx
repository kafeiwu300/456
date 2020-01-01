import React from "react";
import { IIterationInfo } from "../components/StoryMap/interfaces";
import { Table, Modal, Icon, Button } from "antd";
import Column from "antd/lib/table/Column";
import useRouter from "use-react-router";
import { Link } from "react-router-dom";
import moment from "moment";
import IterationForm from "../components/StoryMap/IterationForm";
import StoryMapContext from "../common/contexts/StoryMapContext";

const IterationTable: React.FC<{ iterations: IIterationInfo[] }> = ({
  iterations
}) => {
  const { match } = useRouter<{
    projectId: string;
  }>();

  const { projectId } = match.params;
  const {
    addIteration: _addIteration,
    modifyIteration: _modifyIteration,
    removeIteration: _removeIteration
  } = StoryMapContext.useContainer();

  let iterationForm: any = undefined;

  const addIteration = () => {
    Modal.confirm({
      title: "添加迭代",
      okText: "保存",
      cancelText: "取消",
      icon: <Icon type="plus-circle" />,
      width: 600,
      content: (
        <IterationForm
          wrappedComponentRef={(form: any) => (iterationForm = form)}
          iteration={{ isActive: false }}
        />
      ),
      centered: true,
      onOk: () => {
        if (iterationForm && iterationForm.props) {
          _addIteration({
            ...iterationForm.props.iteration,
            ...iterationForm.props.form.getFieldsValue()
          });
        }
      }
    });
  };

  const modifyIteration = (iteration: IIterationInfo) => {
    Modal.confirm({
      title: "修改迭代",
      okText: "保存",
      cancelText: "取消",
      icon: <Icon type="edit" />,
      width: 600,
      content: (
        <IterationForm
          wrappedComponentRef={(form: any) => (iterationForm = form)}
          iteration={iteration}
        />
      ),
      centered: true,
      onOk: () => {
        if (iterationForm && iterationForm.props) {
          _modifyIteration({
            ...iteration,
            ...iterationForm.props.form.getFieldsValue()
          });
        }
      }
    });
  };

  const removeIteration = (iteration: IIterationInfo) => {
    Modal.confirm({
      title: "删除迭代",
      okText: "保存",
      cancelText: "取消",
      width: 600,
      content: "确定要删除这个迭代吗？",
      icon: <Icon type="delete" />,
      onOk: () => {
        _removeIteration(iteration.id!);
      }
    });
  };

  return (
    <Table
      dataSource={iterations}
      title={() => <Button onClick={addIteration}>新建迭代</Button>}
    >
      <Column
        title="标题"
        dataIndex="title"
        key="title"
        render={(_: string, record: IIterationInfo) => (
          <Link to={`/project/${projectId}/iteration/${record.id}`}>
            {record.title}
          </Link>
        )}
      />
      <Column title="迭代目标" dataIndex="target" key="target" />
      <Column title="负责人" dataIndex="leader" key="leader" />
      <Column
        title="开始时间"
        dataIndex="startTime"
        key="startTime"
        render={(text: string) => moment(text).format("YYYY-MM-DD HH:mm:ss")}
      />
      <Column
        title="结束时间"
        dataIndex="endTime"
        key="endTime"
        render={(text: string) => moment(text).format("YYYY-MM-DD HH:mm:ss")}
      />
      <Column
        title="操作"
        render={(_, iteration: IIterationInfo) => (
          <Button.Group>
            <Button onClick={() => modifyIteration(iteration)}>修改</Button>
            <Button type="danger" onClick={() => removeIteration(iteration)}>
              删除
            </Button>
          </Button.Group>
        )}
      />
    </Table>
  );
};

export default IterationTable;