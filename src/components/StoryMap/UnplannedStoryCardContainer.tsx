import { IStoryInEpic, IDragObject } from "./interfaces";
import React, { CSSProperties } from "react";
import { Row, Col, Modal, Icon } from "antd";
import StoryCard from "./StoryCard";
import StoryForm from "./StoryForm";
import { useDrop } from "react-dnd";
import ProjectContext from "../../common/contexts/ProjectContext";
import StoryMapContext from "../../common/contexts/StoryMapContext";
import useRouter from "use-react-router";

const UnplannedStoryCardContainer: React.FC<{
  unplannedStories: IStoryInEpic[];
}> = ({ unplannedStories }) => {
  const { project } = ProjectContext.useContainer();
  const { addStory: _addStory, moveStory: _moveStory } = StoryMapContext.useContainer();

  const { match } = useRouter<{
    projectId: string;
  }>();
  const { projectId } = match.params;

  let storyForm: any = undefined;

  const addUnplannedStory = () => {
    Modal.confirm({
      title: "添加用户故事",
      okText: "保存",
      cancelText: "取消",
      icon: <Icon type="plus-circle" />,
      width: 600,
      content: (
        <StoryForm
          storyStatus={project.storyStatusList}
          wrappedComponentRef={(form: any) => (storyForm = form)}
        />
      ),
      centered: true,
      onOk: () => {
        if (storyForm && storyForm.props) {
          _addStory({
            ...storyForm.props.story,
            ...storyForm.props.form.getFieldsValue()
          }, projectId);
        }
      }
    });
  };

  const [, drop] = useDrop({
    accept: "storyCard",
    canDrop: () => {
      return true;
    },
    drop: (item: IDragObject) => {
      _moveStory(item.story);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const addUnplannedStoryStyle: CSSProperties = {
    padding: "12px 16px",
    borderRadius: "4px",
    backgroundColor: "white",
    textAlign: "center",
    border: "1px solid #d9d9d9",
    margin: "4px 0",
    cursor: "pointer"
  };

  return (
    <div ref={drop}>
      <Row>
        {unplannedStories.map((story: IStoryInEpic) => (
          <Col span={4} style={{ padding: "0 4px" }}>
            <StoryCard story={story} />
          </Col>
        ))}
        <Col span={4} style={{ padding: "0 4px" }}>
          <div style={addUnplannedStoryStyle} onClick={addUnplannedStory}>
            <Icon type="plus" />
            添加故事
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UnplannedStoryCardContainer;
