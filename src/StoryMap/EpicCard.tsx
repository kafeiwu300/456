import React, { useState } from 'react';
import { Collapse, Button, Descriptions, Modal } from 'antd';
import { IEpicInfo } from './interfaces';
import { store } from '../store';
import EpicForm from './EpicForm';

const EpicCard: React.FC<{epic: IEpicInfo}> = ({epic}) => {
  const [ghost, setGhost] = useState<boolean>(true);

  let epicForm: any = undefined;
  
  const modifyEpic = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    Modal.confirm({
      title: '修改史诗故事',
      okText: '保存',
      cancelText: '取消',
      icon: <></>,
      width: 600,
      content: <EpicForm wrappedComponentRef={(form: any) => epicForm = form} epic={epic}/>,
      centered: true,
      onOk: () => {
        if (epicForm && epicForm.props) {
          const t: IEpicInfo = {
            ...epic,
            ...epicForm.props.form.getFieldsValue()
          };
          store.dispatch({
            type: 'storyMap-modifyEpic',
            epic: t
          })
        }
      }
    })
  }

  const removeEpic = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    Modal.confirm({
      title: '删除史诗故事',
      okText: '保存',
      cancelText: '取消',
      icon: <></>,
      width: 600,
      content: '确定要删除这个史诗故事吗？',
      onOk: () => {
        store.dispatch({
          type: 'storyMap-removeEpic',
          epic
        });
      }
    })
  }

  return (
    <div onMouseOverCapture={() => setGhost(false)} onMouseOutCapture={() => setGhost(true)}>
      <Collapse>
        <Collapse.Panel showArrow={false} key={epic.id} header={epic.title} style={{position: 'relative'}} extra={
          <>
            <Button onClick={modifyEpic} size='small' icon='edit' ghost={ghost} style={{border: 'none'}}/>
            <Button onClick={removeEpic} size='small' icon='delete' ghost={ghost} style={{border: 'none'}}/>
          </>
        }>
          <Descriptions size='small' colon={false}>
            <Descriptions.Item label='' span={4}>{epic.description}</Descriptions.Item>
            {/* <Descriptions.Item label='状态' span={4}>{task.state}</Descriptions.Item> */}
            {/* <Descriptions.Item label='估算工时' span={4}>{task.estimatedHours}</Descriptions.Item> */}
          </Descriptions>
        </Collapse.Panel>
      </Collapse>
    </div>
  )
}

export default EpicCard;