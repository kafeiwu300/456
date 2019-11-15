import { Reducer } from "redux";
import { ActionType } from "./enums";
import { IStory, ITask, IStoryAction, ITaskAction } from "./interfaces";

export const reducer: Reducer<IStory[], IStoryAction | ITaskAction> = (prevState, action) => {
  let state: IStory[] = prevState ? [...prevState] : [];
  let story: IStory | undefined;
  let task: ITask | undefined;
  const taskAction = action as ITaskAction;
  const storyAction = action as IStoryAction;
  switch (action.type) {
    case ActionType.moveTask:
      story = state.find((s: IStory) => s.id === taskAction.story.id);
      task = story!.tasks.find((t: ITask) => t.id === taskAction.task.id);
      task!.state = action.state;
      break;
    case ActionType.addTask:
      story = state.find((s: IStory) => s.id === taskAction.story.id);
      story!.tasks.push(taskAction.task);
      break;
    case ActionType.removeTask:
      story = state.find((s: IStory) => s.id === action.story.id);
      story!.tasks = story!.tasks.filter((task: ITask) => task.id !== taskAction.task.id);
      break;
    case ActionType.modifyTask:
      story = state.find((s: IStory) => s.id === action.story.id);
      story!.tasks = story!.tasks.map((t: ITask) => t.id === taskAction.task!.id ? taskAction.task : t) as ITask[];
      break;
    case ActionType.addStory:
      state.push({...storyAction.story, tasks: []});
      break;
    case ActionType.removeStory:
      state = state.filter((s: IStory) => s.id !== action.story.id);
      break;
    case ActionType.modifyStory:
      state = state.map((s: IStory) => s.id === action.story.id ? {...storyAction.story, tasks: s.tasks} : s);
      break;
    default:
      state = prevState || [];
  }
  return state;
}