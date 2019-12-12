import { Reducer } from "redux";
import { IStory, ITask, IStoryAction, ITaskAction, IKanbanAction } from "./interfaces";
import { getStories, removeStory, modifyStory, addStory } from "../agent/storyAgent";
import { store } from "../store";
import { removeTask, modifyTask, moveTask, addTask } from "../agent/taskAgent";

const getKanbanData = async (iterationId: string) => {
  const stories = await getStories(iterationId).then(res => res.body);
  store.dispatch({
    type: 'kanban-setData',
    data: stories
  });
};

const taskReducer: Reducer<IStory[], ITaskAction> = (prevState, action) => {
  // console.log(action);
  let state: IStory[] = prevState ? [...prevState] : [];
  switch (action.type) {
    case 'kanban-moveTask':
      // story = state.find((s: IStory) => s.id === action.story.id);
      // task = story!.taskList.find((t: ITask) => t.id === action.task.id);
      // task!.status = action.status;
      moveTask(action.task.id!, action.status).then(() => getKanbanData(action.iterationId));
      break;
    case 'kanban-addTask':
      // story = state.find((s: IStory) => s.id === action.story.id);
      // story!.taskList = story!.taskList.concat(action.task);
      addTask(action.task).then(() => getKanbanData(action.iterationId));
      break;
    case 'kanban-removeTask':
      removeTask(action.task.id!).then(() => getKanbanData(action.iterationId));
      // story = state.find((s: IStory) => s.id === action.story.id);
      // story!.taskList = story!.taskList.filter((task: ITask) => task.id !== action.task.id);
      break;
    case 'kanban-modifyTask':
      // story = state.find((s: IStory) => s.id === action.story.id);
      // story!.taskList = story!.taskList.map((t: ITask) => t.id === action.task!.id ? action.task : t) as ITask[];
      modifyTask(action.task).then(() => getKanbanData(action.iterationId));
      break;
  }
  return state;
}

const storyReducer: Reducer<IStory[], IStoryAction> = (prevState, action) => {
  let state: IStory[] = prevState ? [...prevState] : [];
  switch (action.type) {
    case 'kanban-addStory':
      addStory(action.story, action.projectId, action.iterationId).then(() => getKanbanData(action.iterationId));
      // state = state.concat({...action.story, taskList: []});
      break;
    case 'kanban-removeStory':
      removeStory(action.story.id!).then(() => getKanbanData(action.iterationId));
      // state = state.filter((s: IStory) => s.id !== action.story.id);
      break;
    case 'kanban-modifyStory':
      modifyStory(action.story).then(() => getKanbanData(action.iterationId));
      // state = state.map((s: IStory) => s.id === action.story.id ? {...action.story, taskList: s.taskList} : s);
      break;
  }
  return state;
}

export const kanbanReducer: Reducer<IStory[], IKanbanAction> = (prevState, action) => {
  if (action.type === 'kanban-setData') {
    return action.data!;
  } else if (action.type === 'kanban-getData') {
    getKanbanData(action.iterationId);
    return prevState!;
  } else {
    return storyReducer(taskReducer(prevState, action as ITaskAction), action as IStoryAction);
  }
}