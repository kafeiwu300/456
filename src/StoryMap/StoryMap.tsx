import React, { CSSProperties } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from "react-dnd-html5-backend";
import { Row, Col, Icon } from 'antd';
import { storyMapData } from './store';
import { IEpicInfo, IIterationWithStory } from './interfaces';
import StoryCardContainer from './StoryCardContainer';

const StoryMap: React.FC = () => {
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


  return (
    <DndProvider backend={HTML5Backend}>
      <Row style={{marginBottom: '8px'}} gutter={8}>
        <Col span={4}><div style={headerStyle}>Iteration</div></Col>
        {
          storyMapData.epics.map((epic: IEpicInfo) => <Col span={4}><div style={headerStyle}>{epic.title}</div></Col>)
        }
        <Col span={4}><div style={addIterationStyle}><Icon type="plus"/>添加史诗故事</div></Col>
      </Row>
      {
        storyMapData.iterations
          .sort((a: IIterationWithStory, b: IIterationWithStory) => a.index - b.index)
          .map((iteration: IIterationWithStory) => (
            <Row style={{marginBottom: '8px'}} gutter={8}>
              <Col span={4}>
                <div style={outerStyle}>{`迭代${iteration.index} - ${iteration.title}`}</div>
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
          <div style={addIterationStyle}><Icon type="plus"/>添加迭代</div>
        </Col>
      </Row>
    </DndProvider>
  )
}

export default StoryMap;