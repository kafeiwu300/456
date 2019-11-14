import { Reducer } from "redux";
import { ActionType } from "./enums";
import { IStory, IAction, ITask } from "../interfaces";

export const reducer: Reducer<IStory[], IAction> = (prevState, action) => {
  let state: IStory[] = prevState ? [...prevState] : [];
  let story: IStory | undefined;
  let task: ITask | undefined;
  switch (action.type) {
    case ActionType.moveTask:
      story = state.find((s: IStory) => s.id === action.story.id);
      task = story!.tasks.find((t: ITask) => t.id === action.task!.id);
      task!.state = action.state;
      break;
    case ActionType.addTask:
      story = state.find((s: IStory) => s.id === action.story.id);
      story!.tasks.push(action.task!);
      break;
    case ActionType.removeTask:
      story = state.find((s: IStory) => s.id === action.story.id);
      story!.tasks = story!.tasks.filter((task: ITask) => task.id !== action.task!.id);
      break;
    case ActionType.modifyTask:
      story = state.find((s: IStory) => s.id === action.story.id);
      story!.tasks = story!.tasks.map((t: ITask) => t.id === action.task!.id ? action.task : t) as ITask[];
      break;
    case ActionType.addStory:
      state.push(action.story);
      break;
    case ActionType.removeStory:
      state = state.filter((s: IStory) => s.id !== action.story.id);
      break;
    case ActionType.modifyStory:
      state = state.map((s: IStory) => s.id === action.story.id ? action.story : s);
      break;
    default:
      state = prevState || [];
  }
  return state;
}