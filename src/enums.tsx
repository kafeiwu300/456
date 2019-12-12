export type KanbanActionType = 'kanban-moveTask' | 'kanban-addTask' | 'kanban-removeTask' | 'kanban-modifyTask' | 'kanban-addStory' | 'kanban-removeStory' | 'kanban-modifyStory' | 'kanban-getData' | 'kanban-setData'
export type StoryMapActionType = 'storyMap-moveStory' | 'storyMap-addStory' | 'storyMap-removeStory' | 'storyMap-modifyStory' | 'storyMap-addIteration' | 'storyMap-removeIteration' | 'storyMap-modifyIteration' | 'storyMap-addEpic' | 'storyMap-removeEpic' | 'storyMap-modifyEpic' | 'storyMap-getData' | 'storyMap-setData'
export type BugActionType = 'bug-moveBug' | 'bug-addBug' | 'bug-removeBug' | 'bug-modifyBug' | 'bug-getData' | 'bug-setData'
export type ProjectActionType = 'project-getData' | 'project-setData';
export type ActionType = KanbanActionType | StoryMapActionType | BugActionType | ProjectActionType;
// export type KanbanState = 'todo' | 'doing' | 'test' | 'deploy' | 'done'
export type KanbanState = string
// export type BugState =
//   | "to-be-acknowledged"
//   | "to-be-fixed"
//   | "fixing"
//   | "to-be-accepted"
//   | "accepted"
//   | "closed";
export type BugState = string