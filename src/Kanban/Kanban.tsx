import React, { CSSProperties, useEffect, useContext } from 'react';
import { Row, Col, Icon, Modal } from 'antd';
import TaskCardContainer from './TaskCardContainer';
import { connect } from 'react-redux';
import { IStory } from './interfaces';
import StoryCard from './StoryCard';
import { store } from '../store';
import { IState } from '../interfaces';
import useRouter from 'use-react-router';
import { KanbanState } from '../enums';
import ProjectContext from '../common/contexts/ProjectContext';
import StoryForm from '../StoryMap/StoryForm';

const Kanban: React.FC<{stories: IStory[]}> = ({stories}) => {
  const project = useContext(ProjectContext);

  const outerStyle = {
    // backgroundColor: '#e8e8e8',
    backgroundColor: '#fafafa',
    padding: '12px 16px 12px 12px',
    borderRadius: '4px',
    border: '1px solid #d9d9d9',
    lineHeight: '22px',
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
      title: '添加故事',
      okText: '保存',
      cancelText: '取消',
      icon: <Icon type="plus-circle"/>,
      width: 600,
      content: <StoryForm storyStatus={project.storyStatusList} wrappedComponentRef={(form: any) => storyForm = form} initialValue={{description: '作为……，\n我希望……，\n以便于……'}}/>,
      centered: true,
      onOk: () => {
        if (storyForm && storyForm.props) {
          store.dispatch({
            type: 'kanban-addStory',
            story: {
              tasks: [],
              ...storyForm.props.story,
              ...storyForm.props.form.getFieldsValue(),
            },
            projectId,
            iterationId
          });
        }
      }
    })
  }

  const { match } = useRouter<{
    projectId: string,
    iterationId: string
  }>();
  const { projectId, iterationId } = match.params;

  return (
    <>
      <Row style={{display: 'flex', marginBottom: '8px'}} gutter={8}>
        <Col style={{flex: '0 0 260px', width: '260px'}} span={4}><div style={headerStyle}>story</div></Col>
        {/* <Col style={{flex: '0 0 260px', width: '260px'}}><div style={headerStyle}>待开发</div></Col>
        <Col style={{flex: '0 0 260px', width: '260px'}}><div style={headerStyle}>开发中</div></Col>
        <Col style={{flex: '0 0 260px', width: '260px'}}><div style={headerStyle}>测试中</div></Col>
        <Col style={{flex: '0 0 260px', width: '260px'}}><div style={headerStyle}>部署中</div></Col>
        <Col style={{flex: '0 0 260px', width: '260px'}}><div style={headerStyle}>已完成</div></Col> */}
        {
          project.taskStatusList!.map((value: KanbanState) => (
            <Col style={{flex: '0 0 260px', width: '260px'}}>
              <div style={headerStyle}>{value}</div>
            </Col>
          ))
        }
      </Row>
      {stories.map((story: IStory) => {
        return (
          <Row style={{marginBottom: '8px', display: 'flex'}} gutter={8}>
            <Col style={{flex: '0 0 260px', width: '260px'}}>
              {(() => {
                story = story.title === '___' ? (
                  {
                    title: '其他任务',
                    description: '没有所属故事的任务',
                    taskList: story.taskList
                  }
                ) : story;
                // story.description = story.title === '___' ? '没有所属故事的任务' : story.description;
                // story.priority = story.title === '___' ? undefined : story.priority;
                // story.title = story.title === '___' ? '其他任务' : story.title;
                return <StoryCard story={story} editable={story.title !== '其他任务'} deletable={story.title !== '其他任务'}/>
              })()}
            </Col>
            {
              project.taskStatusList!.map((value: KanbanState, index: number) => (
                <Col style={{flex: '0 0 260px', width: '260px'}}>
                  <TaskCardContainer canAddTask={index === 0} story={story} status={value} finished={index === project.taskStatusList.length - 1}/>
                </Col>    
              ))
            }
            {/* <Col style={{flex: '0 0 260px', width: '260px'}}>
              <TaskCardContainer canAddTask={true} story={story} status='待开发'/>
            </Col>
            <Col style={{flex: '0 0 260px', width: '260px'}}>
              <TaskCardContainer canAddTask={false} story={story} status='开发中'/>
            </Col>
            <Col style={{flex: '0 0 260px', width: '260px'}}>
              <TaskCardContainer canAddTask={false} story={story} status='测试中'/>
            </Col>
            <Col style={{flex: '0 0 260px', width: '260px'}}>
              <TaskCardContainer canAddTask={false} story={story} status='部署中'/>
            </Col>
            <Col style={{flex: '0 0 260px', width: '260px'}}>
              <TaskCardContainer canAddTask={false} story={story} status='已完成'/>
            </Col> */}
          </Row>
        )
      })}
      <Row style={{display: 'flex'}} gutter={8}>
        <Col style={{flex: '0 0 260px', width: '260px'}}>
          <div style={addStoryStyle} onClick={addStory}>
            <span style={{cursor: 'pointer'}}><Icon type="plus" />添加故事</span>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default connect((state: IState) => ({stories: state.kanbanData}))(Kanban);