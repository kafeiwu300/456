import React, { CSSProperties } from 'react';
import {Row, Col, Icon, Modal} from 'antd';
import TaskCardContainer from './TaskCardContainer';
import { connect } from 'react-redux';
import { IStory } from './interfaces';
import StoryCard from './StoryCard';
import StoryForm from './StoryForm';
import { DndProvider } from 'react-dnd';
import HTML5Backend from "react-dnd-html5-backend";
import { store } from '../store';
import { guid } from './store';
import { IState } from '../interfaces';

const Kanban: React.FC<{stories: IStory[]}> = ({stories}) => {
  const outerStyle = {
    // backgroundColor: '#e8e8e8',
    backgroundColor: '#fff',
    padding: '12px 16px',
    borderRadius: '4px'
  }

  const addStoryStyle: CSSProperties = {
    ...outerStyle,
    textAlign: 'center',
    border: '1px solid #d9d9d9'
  }

  const headerStyle: CSSProperties = {
    ...outerStyle,
    fontSize: '18px',
    fontWeight: 'bold',
    borderRadius: '4px'
  }

  let storyForm: any = undefined;

  const addStory = () => {
    Modal.confirm({
      okText: '保存',
      cancelText: '取消',
      icon: <></>,
      width: 600,
      content: <StoryForm wrappedComponentRef={(form: any) => storyForm = form} story={{id: guid(), description: '作为……，\n我希望……，\n以便于……'}}/>,
      centered: true,
      onOk: () => {
        if (storyForm && storyForm.props) {
          store.dispatch({
            type: 'kanban-addStory',
            story: {
              tasks: [],
              ...storyForm.props.form.getFieldsValue()
            }
          });
        }
      }
    })
  }

  return (
    // <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <Row gutter={[8, 16]}>
        <Col span={4}><div style={headerStyle}>story</div></Col>
        <Col span={4}><div style={headerStyle}>todo</div></Col>
        <Col span={4}><div style={headerStyle}>doing</div></Col>
        <Col span={4}><div style={headerStyle}>test</div></Col>
        <Col span={4}><div style={headerStyle}>deploy</div></Col>
        <Col span={4}><div style={headerStyle}>done</div></Col>
      </Row>
      {stories.map((story: IStory) => {
        return (
          <Row style={{marginBottom: '8px'}} gutter={8}>
            <Col span={4}>
              <StoryCard story={story}/>
            </Col>
            <Col span={4}>
              <TaskCardContainer story={story} state='todo'/>
            </Col>
            <Col span={4}>
              <TaskCardContainer story={story} state='doing'/>
            </Col>
            <Col span={4}>
              <TaskCardContainer story={story} state='test'/>
            </Col>
            <Col span={4}>
              <TaskCardContainer story={story} state='deploy'/>
            </Col>
            <Col span={4}>
              <TaskCardContainer story={story} state='done'/>
            </Col>
          </Row>
        )
      })}
      <Row gutter={8}>
        <Col span={4}>
          <div style={addStoryStyle} onClick={addStory}>
            <span style={{cursor: 'pointer'}}><Icon type="plus" />添加故事</span>
          </div>
        </Col>
      </Row>
    </DndProvider>
    // </Provider>
  )
}

export default connect((state: IState) => ({stories: state.kanbanData}))(Kanban);