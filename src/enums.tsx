export type ActionType = 'kanban-moveTask' | 'kanban-addTask' | 'kanban-removeTask' | 'kanban-modifyTask' | 'kanban-addStory' | 'kanban-removeStory' | 'kanban-modifyStory' | 'kanban-getData' | 'kanban-setData'
| 'storyMap-moveStory' | 'storyMap-addStory' | 'storyMap-removeStory' | 'storyMap-modifyStory' | 'storyMap-addIteration' | 'storyMap-removeIteration' | 'storyMap-modifyIteration' | 'storyMap-addEpic' | 'storyMap-removeEpic' | 'storyMap-modifyEpic' | 'storyMap-getData' | 'storyMap-setData'
| 'bug-moveBug' | 'bug-addBug' | 'bug-removeBug' | 'bug-modifyBug' | 'bug-getData' | 'bug-setData';
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