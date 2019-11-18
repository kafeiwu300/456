import React, { CSSProperties } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from "react-dnd-html5-backend";
import { Row, Col, Icon, Modal } from 'antd';
import { IEpicInfo, IIteration } from './interfaces';
import StoryCardContainer from './StoryCardContainer';
import { connect } from 'react-redux';
import { IState } from '../interfaces';
import IterationForm from './IterationForm';
import { guid } from '../Kanban/store';
import { store } from '../store';
import IterationCard from './IterationCard';
import EpicCard from './EpicCard';
import EpicForm from './EpicForm';

const StoryMap: React.FC<{storyMapData: {
  epics: IEpicInfo[];
  iterations: IIteration[];
}}> = ({storyMapData}) => {
  const outerStyle = {
    // backgroundColor: '#e8e8e8',
    backgroundColor: '#fff',
    padding: '12px 16px',
    borderRadius: '4px'
  }
  
  const headerStyle: CSSProperties = {
    ...outerStyle,
    fontSize: '18px',
    fontWeight: 'bold',
    borderRadius: '4px'
  }

  const addIterationStyle: CSSProperties = {
    ...outerStyle,
    textAlign: 'center',
    border: '1px solid #d9d9d9'
  }

  let iterationForm: any = undefined;
  let epicForm: any = undefined;

  const addIteration = () => {
    Modal.confirm({
      title: '添加迭代',
      okText: '保存',
      cancelText: '取消',
      icon: <></>,
      width: 600,
      content: <IterationForm wrappedComponentRef={(form: any) => iterationForm = form} iteration={{id: guid(), index: 4, isActive: false}}/>,
      centered: true,
      onOk: () => {
        if (iterationForm && iterationForm.props) {
          store.dispatch({
            type: 'storyMap-addIteration',
            iteration: {
              ...iterationForm.props.iteration,
              ...iterationForm.props.form.getFieldsValue()
            }
          })
        }
      }
    });
  }

  const addEpic = () => {
    Modal.confirm({
      title: '添加史诗故事',
      okText: '保存',
      cancelText: '取消',
      icon: <></>,
      width: 600,
      content: <EpicForm wrappedComponentRef={(form: any) => epicForm = form} epic={{id: guid()}}/>,
      centered: true,
      onOk: () => {
        if (epicForm && epicForm.props) {
          store.dispatch({
            type: 'storyMap-addEpic',
            epic: {
              ...epicForm.props.epic,
              ...epicForm.props.form.getFieldsValue()
            }
          })
        }
      }
    });
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Row style={{marginBottom: '8px'}} gutter={8}>
        <Col span={4}><div style={headerStyle}>Iteration</div></Col>
        {
          storyMapData.epics.map((epic: IEpicInfo) => <Col span={4}><EpicCard epic={epic}/></Col>)
        }
        <Col span={4}><div style={addIterationStyle} onClick={addEpic}><Icon type="plus"/>添加史诗故事</div></Col>
      </Row>
      {
        storyMapData.iterations
          .sort((a: IIteration, b: IIteration) => a.index - b.index)
          .map((iteration: IIteration) => (
            <Row style={{marginBottom: '8px'}} gutter={8}>
              <Col span={4}>
                <IterationCard iteration={iteration}/>
              </Col>
              {
                storyMapData.epics.map((epic: IEpicInfo) => (
                  <Col span={4}>
                    <StoryCardContainer epic={epic} iteration={iteration}/>
                  </Col>
                ))
              }
            </Row>
          ))
      }
      <Row gutter={8}>
        <Col span={4}>
          <div style={addIterationStyle} onClick={addIteration}><Icon type="plus"/>添加迭代</div>
        </Col>
      </Row>
    </DndProvider>
  )
}

export default connect((state: IState) => ({storyMapData: state.storyMapData}))(StoryMap);