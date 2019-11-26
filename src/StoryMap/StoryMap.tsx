import React, { CSSProperties, useState } from 'react';
import { DndProvider, useDrop } from 'react-dnd';
import HTML5Backend from "react-dnd-html5-backend";
import { Row, Col, Icon, Modal, Typography, Affix, Drawer, Button, Tag } from 'antd';
import { IEpicInfo, IIteration, IStoryInEpic, IDragObject } from './interfaces';
import StoryCardContainer from './StoryCardContainer';
import { connect } from 'react-redux';
import { IState } from '../interfaces';
import IterationForm from './IterationForm';
import { guid } from '../Kanban/store';
import { store } from '../store';
import IterationCard from './IterationCard';
import EpicCard from './EpicCard';
import EpicForm from './EpicForm';
import StoryCard from './StoryCard';
import StoryForm from '../Kanban/StoryForm';
import UnplannedStoryCardContainer from './UnplannedStoryCardContainer';

const { Title } = Typography;

const StoryMap: React.FC<{
  epics: IEpicInfo[];
  iterations: IIteration[];
  unplannedStories: IStoryInEpic[];
}> = ({epics, iterations, unplannedStories}) => {
  const outerStyle = {
    // backgroundColor: '#e8e8e8',
    backgroundColor: '#fafafa',
    padding: '12px 16px 12px 12px',
    borderRadius: '4px',
    border: '1px solid #d9d9d9',
    lineHeight: '22px',
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
    border: '1px solid #d9d9d9',
  }

  let iterationForm: any = undefined;
  let epicForm: any = undefined;

  const addIteration = () => {
    Modal.confirm({
      title: '添加迭代',
      okText: '保存',
      cancelText: '取消',
      icon: <Icon type="plus-circle"/>,
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
      icon: <Icon type="plus-circle"/>,
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

  const [bottomHeight, setBottomHeight] = useState<number>(0);

  return (
    <DndProvider backend={HTML5Backend}>
      <Row style={{marginBottom: '8px', display:'flex'}} gutter={8}>
        <Col style={{flex: '0 0 260px', width: '260px'}}><div style={headerStyle}>Iteration</div></Col>
        {
          epics.map((epic: IEpicInfo) => <Col style={{flex: '0 0 260px', width: '260px'}}><EpicCard epic={epic}/></Col>)
        }
        <Col style={{flex: '0 0 260px', width: '260px'}}><div style={addIterationStyle} onClick={addEpic}><Icon type="plus"/>添加史诗故事</div></Col>
      </Row>
      {
        iterations
          .sort((a: IIteration, b: IIteration) => a.index - b.index)
          .map((iteration: IIteration) => (
            <Row style={{marginBottom: '8px', display: 'flex'}} gutter={8}>
              <Col style={{flex: '0 0 260px', width: '260px'}}>
                <IterationCard iteration={iteration}/>
              </Col>
              {
                epics.map((epic: IEpicInfo) => (
                  <Col style={{flex: '0 0 260px', width: '260px'}}>
                    <StoryCardContainer epic={epic} iteration={iteration}/>
                  </Col>
                ))
              }
            </Row>
          ))
      }
      <Row style={{display: 'flex', marginBottom: bottomHeight + 'px'}} gutter={8}>
        <Col style={{flex: '0 0 260px', width: '260px'}}>
          <div style={addIterationStyle} onClick={addIteration}><Icon type="plus"/>添加迭代</div>
        </Col>
      </Row>
      <div ref={(ref: HTMLDivElement) => {
        if (ref) {
          setBottomHeight(ref.clientHeight);
        }
      }} style={{position: 'fixed', bottom: '0', width: '100%'}}>
        <UnplannedStoryCardContainer unplannedStories={unplannedStories}/>
      </div>
    </DndProvider>
  )
}

export default connect((state: IState) => ({...state.storyMapData}))(StoryMap);