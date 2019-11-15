import { Reducer } from "redux";
import { IStory, ITask, IStoryAction, ITaskAction, IKanbanAction } from "./interfaces";

const taskReducer: Reducer<IStory[], ITaskAction> = (prevState, action) => {
  let state: IStory[] = prevState ? [...prevState] : [];
  let story: IStory | undefined;
  let task: ITask | undefined;
  switch (action.type) {
    case 'kanban-moveTask':
      story = state.find((s: IStory) => s.id === action.story.id);
      task = story!.tasks.find((t: ITask) => t.id === action.task.id);
      task!.state = action.state;
      break;
    case 'kanban-addTask':
      story = state.find((s: IStory) => s.id === action.story.id);
      story!.tasks = story!.tasks.concat(action.task);
      break;
    case 'kanban-removeTask':
      story = state.find((s: IStory) => s.id === action.story.id);
      story!.tasks = story!.tasks.filter((task: ITask) => task.id !== action.task.id);
      break;
    case 'kanban-modifyTask':
      story = state.find((s: IStory) => s.id === action.story.id);
      story!.tasks = story!.tasks.map((t: ITask) => t.id === action.task!.id ? action.task : t) as ITask[];
      break;
  }
  return state;
}

const storyReducer: Reducer<IStory[], IStoryAction> = (prevState, action) => {
  let state: IStory[] = prevState ? [...prevState] : [];
  switch (action.type) {
    case 'kanban-addStory':
      state = state.concat({...action.story, tasks: []});
      break;
    case 'kanban-removeStory':
      state = state.filter((s: IStory) => s.id !== action.story.id);
      break;
    case 'kanban-modifyStory':
      state = state.map((s: IStory) => s.id === action.story.id ? {...action.story, tasks: s.tasks} : s);
      break;
  }
  return state;
}

export const kanbanReducer: Reducer<IStory[], IKanbanAction> = (prevState, action) => {
  return storyReducer(taskReducer(prevState, action as ITaskAction), action as IStoryAction);
}