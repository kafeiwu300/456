import React, { CSSProperties } from 'react';
import {Row, Col, Icon, Modal} from 'antd';
import TaskCardContainer from './TaskCardContainer';
import { connect } from 'react-redux';
import { IStory } from './interfaces';
import StoryCard from './StoryCard';
import StoryForm from './StoryForm';
import store, { guid } from './store';
import ActionType from './ActionType';

const Kanban: React.FC<{stories: IStory[]}> = ({stories}) => {
  const outerStyle = {
    backgroundColor: '#e8e8e8',
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
      content: <StoryForm wrappedComponentRef={(form: any) => storyForm = form}/>,
      centered: true,
      onOk: () => {
        if (storyForm && storyForm.props) {
          store.dispatch({
            type: ActionType.addStory,
            story: {
              id: guid(),
              tasks: [],
              ...storyForm.props.form.getFieldsValue()
            }
          });
        }
      }
    })
  }

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={6}><div style={headerStyle}>story</div></Col>
        <Col span={6}><div style={headerStyle}>todo</div></Col>
        <Col span={6}><div style={headerStyle}>doing</div></Col>
        <Col span={6}><div style={headerStyle}>done</div></Col>
      </Row>
      {stories.map((story: IStory) => {
        return (
          <Row style={{marginBottom: '8px'}} gutter={16}>
            <Col span={6}>
              <StoryCard story={story}/>
            </Col>
            <Col span={6}>
              <TaskCardContainer story={story} state="todo"/>
            </Col>
            <Col span={6}>
              <TaskCardContainer story={story} state="doing"/>
            </Col>
            <Col span={6}>
              <TaskCardContainer story={story} state="done"/>
            </Col>
          </Row>
        )
      })}
      <Row gutter={16}>
        <Col span={6}>
          <div style={addStoryStyle} onClick={addStory}>
            <span style={{cursor: 'pointer'}}><Icon type="plus" />添加故事</span>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default connect((state: IStory[]) => ({stories: state}))(Kanban);