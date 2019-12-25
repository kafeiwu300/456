import React, { CSSProperties, useState } from 'react';
import { Row, Col, Icon, Modal, Layout, Affix, PageHeader } from 'antd';
import { IEpicInfo, IIteration, IStoryInEpic } from './interfaces';
import StoryCardContainer from './StoryCardContainer';
import { connect } from 'react-redux';
import { IState } from '../interfaces';
import IterationForm from './IterationForm';
import { store } from '../store';
import IterationCard from './IterationCard';
import EpicCard from './EpicCard';
import EpicForm from './EpicForm';
import UnplannedStoryCardContainer from './UnplannedStoryCardContainer';
import useRouter from 'use-react-router';

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
    cursor: 'pointer'
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
      content: <IterationForm wrappedComponentRef={(form: any) => iterationForm = form} iteration={{isActive: false}}/>,
      centered: true,
      onOk: () => {
        if (iterationForm && iterationForm.props) {
          store.dispatch({
            type: 'storyMap-addIteration',
            projectId,
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
      content: <EpicForm wrappedComponentRef={(form: any) => epicForm = form} epic={{}}/>,
      centered: true,
      onOk: () => {
        if (epicForm && epicForm.props) {
          store.dispatch({
            type: 'storyMap-addEpic',
            projectId,
            epic: {
              ...epicForm.props.epic,
              ...epicForm.props.form.getFieldsValue()
            }
          })
        }
      }
    });
  }

  const [showUnplanned, setShowUnplanned] = useState<boolean>(false);
  
  const { match } = useRouter<{
    projectId: string
  }>();
  const { projectId } = match.params;

  return (
    <Layout>
      <Layout.Content>
        <Row style={{marginBottom: '8px', display:'flex'}} gutter={8}>
          <Col style={{flex: '0 0 260px', width: 260}}><div style={headerStyle}>Iteration</div></Col>
          {
            epics.map((epic: IEpicInfo) => <Col style={{flex: '0 0 260px', width: 260}}><EpicCard epic={epic}/></Col>)
          }
          <Col style={{flex: '0 0 260px', width: 260}}><div style={addIterationStyle} onClick={addEpic}><Icon type="plus"/>添加史诗故事</div></Col>
        </Row>
        {
          iterations
            .sort((a: IIteration, b: IIteration) => a.index! - b.index!)
            .map((iteration: IIteration) => (
              <Row style={{marginBottom: '8px', display: 'flex'}} gutter={8}>
                <Col style={{flex: '0 0 260px', width: 260}}>
                  <IterationCard iteration={iteration}/>
                </Col>
                {
                  epics.map((epic: IEpicInfo) => (
                    <Col style={{flex: '0 0 260px', width: 260}}>
                      <StoryCardContainer epic={epic} iteration={iteration}/>
                    </Col>
                  ))
                }
              </Row>
            ))
        }
        <Row style={{display: 'flex'}} gutter={8}>
          <Col style={{flex: '0 0 260px', width: 260}}>
            <div style={addIterationStyle} onClick={addIteration}><Icon type="plus"/>添加迭代</div>
          </Col>
        </Row>
      </Layout.Content>
      <Affix offsetBottom={1}>
        <div style={{textAlign: 'center'}}>
          <Row style={{margin: 'auto', display: 'inline-block', marginTop: -30, lineHeight: '30px', textAlign: 'center', width: 120, height: 0, borderRadius: '4px 4px 0 0', borderBottom: '30px solid rgb(135, 208, 104)', cursor: 'pointer'}} onClick={() => setShowUnplanned(!showUnplanned)}>未规划的故事</Row>
          <UnplannedStoryCardContainer visible={showUnplanned} unplannedStories={unplannedStories}/>
        </div>
      </Affix>
    </Layout>
  )
}

export default connect((state: IState) => ({...state.storyMapData}))(StoryMap);