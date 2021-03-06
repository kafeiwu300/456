import React, { useState } from 'react';
import { Collapse, Button, Descriptions, Modal, Icon } from 'antd';
import { IEpicInfo } from './interfaces';
import EpicForm from './EpicForm';
import StoryMapContext from '../../common/contexts/StoryMapContext';

const EpicCard: React.FC<{epic: IEpicInfo}> = ({epic}) => {
  const [ghost, setGhost] = useState<boolean>(true);

  const { modifyEpic: _modifyEpic, removeEpic: _removeEpic } = StoryMapContext.useContainer();

  let epicForm: any = undefined;
  
  const modifyEpic = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    Modal.confirm({
      title: '修改史诗故事',
      okText: '保存',
      cancelText: '取消',
      icon: <Icon type="edit" />,
      width: 600,
      content: <EpicForm wrappedComponentRef={(form: any) => epicForm = form} epic={epic}/>,
      centered: true,
      onOk: () => {
        if (epicForm && epicForm.props) {
          _modifyEpic({
            ...epic,
            ...epicForm.props.form.getFieldsValue()
          });
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
      icon: <Icon type="delete" />,
      width: 600,
      content: '确定要删除这个史诗故事吗？',
      onOk: () => {
        _removeEpic(epic.id!);
      }
    })
  }

  return (
    <div onMouseOverCapture={() => setGhost(false)} onMouseOutCapture={() => setGhost(true)}>
      <Collapse>
        <Collapse.Panel showArrow={false} key={epic.id!} header={epic.title} style={{wordBreak: 'break-word', fontSize: '18px', fontWeight: 'bold'}} extra={
          <>
            <Button onClick={modifyEpic} size='small' icon='edit' ghost={ghost} style={{border: 'none', backgroundColor: 'transparent'}}/>
            <Button onClick={removeEpic} size='small' icon='delete' ghost={ghost} style={{border: 'none', backgroundColor: 'transparent'}}/>
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