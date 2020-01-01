import React, { CSSProperties } from "react";
import { Icon, Modal } from "antd";
import { useDrop } from "react-dnd";
import { IEpicInfo, IIteration, IStoryInEpic, IDragObject } from "./interfaces";
import StoryCard from "./StoryCard";
import StoryForm from "./StoryForm";
import useRouter from "use-react-router";
import ProjectContext from "../../common/contexts/ProjectContext";
import StoryMapContext from "../../common/contexts/StoryMapContext";

const StoryCardContainer: React.FC<{
  epic: IEpicInfo;
  iteration: IIteration;
}> = ({ epic, iteration }) => {
  const { project } = ProjectContext.useContainer();
  const { addStory: _addStory, moveStory: _moveStory } = StoryMapContext.useContainer();

  const outerStyle = {
    // backgroundColor: '#e8e8e8',
    backgroundColor: "#FFFFFF",
    padding: "4px 8px",
    borderRadius: "4px",
    border: "1px solid #d9d9d9"
  };

  const addStoryStyle: CSSProperties = {
    padding: "12px 16px",
    borderRadius: "4px",
    backgroundColor: "white",
    textAlign: "center",
    border: "1px solid #d9d9d9",
    margin: "4px 0",
    cursor: "pointer"
  };

  let storyForm: any = undefined;

  const [, drop] = useDrop({
    accept: "storyCard",
    canDrop: () => {
      return true;
    },
    drop: (item: IDragObject) => {
      _moveStory(item.story, iteration.id, epic.id);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const addStory = () => {
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
          initialValue={{}}
        />
      ),
      centered: true,
      onOk: () => {
        if (storyForm && storyForm.props) {
          _addStory({
            ...storyForm.props.story,
            ...storyForm.props.form.getFieldsValue(),
          }, projectId, iteration.id, epic.id);
        }
      }
    });
  };

  const { match } = useRouter<{
    projectId: string;
  }>();
  const { projectId } = match.params;

  return (
    <div style={outerStyle} ref={drop}>
      {iteration.storyList
        .filter((story: IStoryInEpic) => story.epicId === epic.id)
        .map((story: IStoryInEpic) => (
          <StoryCard story={story} />
        ))}
      <div style={addStoryStyle} onClick={addStory}>
        <Icon type="plus" />
        添加故事
      </div>
    </div>
  );
};

export default StoryCardContainer;
