export type ActionType = 'kanban-moveTask' | 'kanban-addTask' | 'kanban-removeTask' | 'kanban-modifyTask' | 'kanban-addStory' | 'kanban-removeStory' | 'kanban-modifyStory'
| 'storyMap-moveStory' | 'storyMap-addStory' | 'storyMap-removeStory' | 'storyMap-modifyStory' | 'storyMap-addIteration' | 'storyMap-removeIteration' | 'storyMap-modifyIteration' | 'storyMap-addEpic' | 'storyMap-removeEpic' | 'storyMap-modifyEpic'
export type KanbanState = 'todo' | 'doing' | 'test' | 'deploy' | 'done'
export type BugState =
  | "to-be-acknowledged"
  | "to-be-fixed"
  | "fixing"
  | "to-be-accepted"
  | "accepted"
  | "closed";