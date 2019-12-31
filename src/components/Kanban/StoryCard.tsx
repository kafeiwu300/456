import { IStory, IStoryInfo } from "./interfaces";
import React, { useState, useContext } from "react";
import { Modal, Collapse, Descriptions, Tag, Badge, Avatar, Button, Icon } from "antd";
import { store } from "../../store";
import useRouter from "use-react-router";
import StoryForm from "../StoryMap/StoryForm";
import ProjectContext from "../../common/contexts/ProjectContext";

const StoryCard: React.FC<{story: IStoryInfo, editable?: boolean, deletable?: boolean}> = ({story, editable = true, deletable = true}) => {
  let storyForm: any = undefined;

  const [ghost, setGhost] = useState<boolean>(true);

  const project = useContext(ProjectContext);

  const removeStory = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    Modal.confirm({
      title: '删除故事',
      content: '确定要删除这个故事吗？',
      okText: '确定',
      cancelText: '取消',
      width:  600,
      icon: <Icon type="delete" />,
      onOk: () => {
        store.dispatch({
          type: 'kanban-removeStory',
          story
        });
      }
    })
  }

  const modifyStory = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    Modal.confirm({
      title: '修改故事',
      okText: '保存',
      cancelText: '取消',
      icon: <Icon type="edit" />,
      width: 600,
      centered: true,
      content: <StoryForm storyStatus={project.storyStatusList} wrappedComponentRef={(form: any) => storyForm = form} initialValue={story}/>,
      onOk: () => {
        if (storyForm && storyForm.props) {
          const s: IStory = {
            id: story.id,
            ...storyForm.props.form.getFieldsValue(),
            isFinished: storyForm.props.form.getFieldsValue().status === project.storyStatusList[project.storyStatusList.length - 1]
          };
          store.dispatch({
            type: 'kanban-modifyStory',
            story: s,
            iterationId
          })
        }
      }
    })
  }

  const { match } = useRouter<{
    projectId: string,
    iterationId: string
  }>();
  const { iterationId } = match.params;

  return (
    <div onMouseOverCapture={() => setGhost(false)} onMouseOutCapture={() => setGhost(true)}>
      <Collapse defaultActiveKey={[story.id!]}>
        <Collapse.Panel style={{wordBreak: 'break-word'}} key={story.id!} header={story.title} showArrow={false} extra={
          <>
            {
              editable ? <Button onClick={modifyStory} size='small' icon='edit' ghost={ghost} style={{border: 'none', backgroundColor: 'transparent'}}/> : <></>
            }
            {
              deletable ? <Button onClick={removeStory} size='small' icon='delete' ghost={ghost} style={{border: 'none', backgroundColor: 'transparent'}}/> : <></>
            }
          </>
        }>
          {story.priority ? <Tag color='#fa8c16' title="优先级">{story.priority}</Tag> : <></>}
          {story.status ? <Tag color='#2db7f5' title="状态">{story.status}</Tag> : <></>}
          {story.leader ? <span title={story.leader}><Avatar shape="square">{story.leader[story.leader.length - 1]}</Avatar></span> : <></>}
          {story.storyPoint ? <Badge title="故事点" count={story.storyPoint} style={{backgroundColor: '#bfbfbf'}} offset={story.leader ? [8, 0] : [0, 0]}/> : <></>}
          <Descriptions size='small' colon={false}>
            <Descriptions.Item label='' span={4}>{story.description}</Descriptions.Item>
            {/* <Descriptions.Item label='状态' span={4}>{story.state}</Descriptions.Item> */}
            {/* <Descriptions.Item label='故事点' span={4}>{story.storyPoint}</Descriptions.Item> */}
            {/* <Descriptions.Item label='估算工时' span={4}>{story.estimatedHours}</Descriptions.Item> */}
            {/* <Descriptions.Item label='负责人' span={4}>{story.leader}</Descriptions.Item> */}
            {/* <Descriptions.Item label='优先级' span={4}>{story.priority}</Descriptions.Item> */}
          </Descriptions>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
}

export default StoryCard;