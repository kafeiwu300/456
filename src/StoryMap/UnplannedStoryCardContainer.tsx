import { IStoryInEpic, IDragObject } from "./interfaces";
import React, { useState, CSSProperties, useRef, useImperativeHandle, Ref } from "react";
import { Row, Col, Modal, Icon } from "antd";
import StoryCard from "./StoryCard";
import StoryForm from "./StoryForm";
import { store } from "../store";
import { useDrop } from "react-dnd";
import { guid } from "../Kanban/store";

const UnplannedStoryCardContainer: React.RefForwardingComponent<{
  clientHeight: () => number
}, {unplannedStories: IStoryInEpic[]}> = ({unplannedStories}, ref) => {
  let storyForm: any = undefined;

  const addUnplannedStory = () => {
    Modal.confirm({
      title: '添加用户故事',
      okText: '保存',
      cancelText: '取消',
      icon: <Icon type="plus-circle"/>,
      width: 600,
      content: <StoryForm wrappedComponentRef={(form: any) => storyForm = form} story={{id: guid()}}/>,
      centered: true,
      onOk: () => {
        if (storyForm && storyForm.props) {
          store.dispatch({
            type: 'storyMap-addStory',
            story: {
              ...storyForm.props.story,
              ...storyForm.props.form.getFieldsValue()
            }
          });
        }
      }
    });
  }

  const [, drop] = useDrop({
    accept: 'storyCard',
    canDrop: (item: IDragObject) => {
      return true;
    },
    drop: (item: IDragObject) => {
      store.dispatch({
        type: 'storyMap-moveStory',
        story: {...item.story}
      })
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const [showUnplanned, setShowUnplanned] = useState<boolean>(false);

  const addUnplannedStoryStyle: CSSProperties = {
    padding: '12px 16px',
    borderRadius: '4px',
    backgroundColor: 'white',
    textAlign: "center",
    border: '1px solid #d9d9d9',
    margin: '4px 0'
  }

  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    clientHeight: () => containerRef.current!.clientHeight
  }));

  return (
    <div ref={containerRef}>
      <Row style={{margin: 'auto', backgroundColor: '#87d068', lineHeight: '30px', textAlign: 'center', width: '120px', borderRadius: '4px 4px 0 0'}} onClick={() => setShowUnplanned(!showUnplanned)}>未规划的故事</Row>
      {
        showUnplanned ? <div ref={drop}>
          <Row style={{borderTop: '4px #87d068 solid', minHeight: '50px', backgroundColor: 'white'}}>
            {
              unplannedStories.map((story: IStoryInEpic) => (
                <Col span={4} style={{padding: '0 4px'}}>
                  <StoryCard story={story}/>
                </Col>
              ))
            }
            <Col span={4} style={{padding: '0 4px'}}>
              <div style={addUnplannedStoryStyle} onClick={addUnplannedStory}><Icon type="plus"/>添加故事</div>
            </Col>
          </Row>
        </div> : <></>
      }
    </div>
  );
};

export default React.forwardRef(UnplannedStoryCardContainer);