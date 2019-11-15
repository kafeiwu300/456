import { Reducer } from "redux";
import { IStory, ITask, IStoryAction, ITaskAction } from "./interfaces";

const taskReducer: Reducer<IStory[], ITaskAction> = (prevState, action) => {
  let state: IStory[] = prevState ? [...prevState] : [];
  let story: IStory | undefined;
  let task: ITask | undefined;
  switch (action.type) {
    case 'moveTask':
      story = state.find((s: IStory) => s.id === action.story.id);
      task = story!.tasks.find((t: ITask) => t.id === action.task.id);
      task!.state = action.state;
      break;
    case 'addTask':
      story = state.find((s: IStory) => s.id === action.story.id);
      story!.tasks.push(action.task);
      break;
    case 'removeTask':
      story = state.find((s: IStory) => s.id === action.story.id);
      story!.tasks = story!.tasks.filter((task: ITask) => task.id !== action.task.id);
      break;
    case 'modifyTask':
      story = state.find((s: IStory) => s.id === action.story.id);
      story!.tasks = story!.tasks.map((t: ITask) => t.id === action.task!.id ? action.task : t) as ITask[];
      break;
  }
  return state;
}

const storyReducer: Reducer<IStory[], IStoryAction> = (prevState, action) => {
  let state: IStory[] = prevState ? [...prevState] : [];
  switch (action.type) {
    case 'addStory':
      state.push({...action.story, tasks: []});
      break;
    case 'removeStory':
      state = state.filter((s: IStory) => s.id !== action.story.id);
      break;
    case 'modifyStory':
      state = state.map((s: IStory) => s.id === action.story.id ? {...action.story, tasks: s.tasks} : s);
      break;
  }
  return state;
}

export const kanbanReducer: Reducer<IStory[], IStoryAction | ITaskAction> = (prevState, action) => {
  return (action as ITaskAction ? taskReducer(prevState, action as ITaskAction) : storyReducer(prevState, action as IStoryAction));
}