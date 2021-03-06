import React, { useState } from 'react';
import { Collapse, Button, Avatar, Descriptions, Modal, Icon } from 'antd';
import { IIterationInfo } from './interfaces';
import IterationForm from './IterationForm';
import StoryMapContext from '../../common/contexts/StoryMapContext';

const IterationCard: React.FC<{iteration: IIterationInfo}> = ({iteration}) => {
  const [ghost, setGhost] = useState<boolean>(true);

  const { modifyIteration: _modifyIteration, removeIteration: _removeIteration } = StoryMapContext.useContainer();

  let iterationForm: any = undefined;
  
  const modifyIteration = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    Modal.confirm({
      title: '修改迭代',
      okText: '保存',
      cancelText: '取消',
      icon: <Icon type="edit"/>,
      width: 600,
      content: <IterationForm wrappedComponentRef={(form: any) => iterationForm = form} iteration={iteration}/>,
      centered: true,
      onOk: () => {
        if (iterationForm && iterationForm.props) {
          _modifyIteration({
            ...iteration,
            ...iterationForm.props.form.getFieldsValue()
          });
        }
      }
    })
  }

  const removeIteration = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    Modal.confirm({
      title: '删除迭代',
      okText: '保存',
      cancelText: '取消',
      width: 600,
      content: '确定要删除这个迭代吗？',
      icon: <Icon type="delete" />,
      onOk: () => {
        _removeIteration(iteration.id!);
      }
    })
  }


  return (
    <div onMouseOverCapture={() => setGhost(false)} onMouseOutCapture={() => setGhost(true)}>
      <Collapse defaultActiveKey={[iteration.id!]}>
        <Collapse.Panel showArrow={false} key={iteration.id!} header={
          <>
            迭代{iteration.index} - {iteration.title}
            {/* {iteration.isActive ? <Tag color="#87d068">进行中</Tag> : <></>} */}
          </>
          } style={{wordWrap: 'break-word'}} extra={
          <>
            <Button onClick={modifyIteration} size='small' icon='edit' ghost={ghost} style={{border: 'none', backgroundColor: 'transparent'}}/>
            <Button onClick={removeIteration} size='small' icon='delete' ghost={ghost} style={{border: 'none', backgroundColor: 'transparent'}}/>
          </>
        }>
          {iteration.leader ? <span title={iteration.leader}><Avatar shape="square">{iteration.leader[iteration.leader.length - 1]}</Avatar></span> : <></>}
          <Descriptions size='small' colon={false}>
            <Descriptions.Item label='' span={4}>{iteration.target}</Descriptions.Item>
            {/* <Descriptions.Item label='状态' span={4}>{task.state}</Descriptions.Item> */}
            {/* <Descriptions.Item label='估算工时' span={4}>{task.estimatedHours}</Descriptions.Item> */}
          </Descriptions>
        </Collapse.Panel>
      </Collapse>
    </div>
  )
}

export default IterationCard;