import React, { CSSProperties } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from "react-dnd-html5-backend";
import { Row, Col } from 'antd';
import storyMapData from './store';
import { IIteration, IEpic, IStoryInIteration } from './interfaces';

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

  return (
    <DndProvider backend={HTML5Backend}>
      <Row style={{marginBottom: '8px'}} gutter={8}>
        <Col span={4}><div style={headerStyle}>Iteration</div></Col>
        {
          storyMapData.epics.map((epic: IEpic) => <Col span={4}><div style={headerStyle}>{epic.title}</div></Col>)
        }
      </Row>
      {
        storyMapData.iterations
          .sort((a: IIteration, b: IIteration) => a.index - b.index)
          .map((iteration: IIteration) => (
            <Row style={{marginBottom: '8px'}} gutter={8}>
              <Col span={4}>
                <div style={outerStyle}>{`迭代${iteration.index} - ${iteration.title}`}</div>
              </Col>
              {
                storyMapData.epics.map((epic: IEpic) => (
                  <Col span={4}>
                    <div style={outerStyle}>
                      {
                        epic.stories
                          .filter((story: IStoryInIteration) => story.iterationId === iteration.id)
                          .map((story: IStoryInIteration) => (
                            <div style={outerStyle}>{story.title}</div>
                          ))
                      }
                    </div>
                  </Col>
                ))
              }
            </Row>
          ))
      }
    </DndProvider>
  )
}

export default StoryMap;