import { createStore } from "redux";
import { reducer } from "./reducer";
import { IStory, IAction } from "../interfaces";
import { State } from "./enums";

let initState: IStory[] = [
  {
    id: '0',
    title: '搜索职位信息',
    description: '作为一个求职者，我期望我可以按照城市来搜索职位信息。',
    tasks: [
      {
        id: '0',
        title: '移动端UI开发',
        state: State.todo,
        description: '移动端UI开发',
        priority: 3,
        estimatedHours: 2,
        leader: 'Lucy'
      },
      {
        id: '1',
        title: '城市列表UI开发',
        state: State.todo,
        description: '城市列表UI开发',
        priority: 2,
        estimatedHours: 2,
        taskPoint: 6
      },
      {
        id: '2',
        title: '测试案例',
        state: State.todo,
        description: '测试案例',
        estimatedHours: 2,
        leader: 'Lucy'
      },
      {
        id: '3',
        title: '自动化脚本',
        state: State.todo,
        description: '自动化脚本',
        estimatedHours: 2,
        taskPoint: 6
      },
      {
        id: '4',
        title: 'PC web端UI开发',
        state: State.doing,
        description: 'PC web端UI开发',
        estimatedHours: 2
      },
      {
        id: '5',
        title: '搜索服务接口开发',
        state: State.doing,
        description: '搜索服务接口开发',
        priority: 6,
        taskPoint: 6,
        leader: 'Lucy'
      },
      {
        id: '6',
        title: '城市列表数据库设计',
        state: State.done,
        description: '城市列表数据库设计',
        estimatedHours: 2,
        taskPoint: 6
      },
      {
        id: '7',
        title: '职位列表分页',
        state: State.done,
        description: '职位列表分页',
        estimatedHours: 2,
        leader: 'Lucy'
      }
    ]
  },
  {
    id: '1',
    title: '发布招聘职位',
    description: '作为公司的HR，我可以发布一个招聘职位。',
    tasks: [
      {
        id: '8',
        title: '招聘发布后台服务',
        state: State.todo,
        description: '招聘发布后台服务',
        estimatedHours: 2,
        taskPoint: 6,
        leader: 'Lucy'
      },
      {
        id: '9',
        title: '招聘发布测试案例',
        state: State.todo,
        description: '招聘发布测试案例',
        estimatedHours: 2,
        taskPoint: 6
      },
      {
        id: '10',
        title: '移动的发布前端开发',
        state: State.todo,
        description: '移动的发布前端开发',
        estimatedHours: 2
      },
      {
        id: '11',
        title: '招聘信息数据结构',
        state: State.doing,
        description: '招聘信息数据结构',
        leader: 'Lucy'
      },
      {
        id: '12',
        title: '招聘信息页面UI开发',
        state: State.doing,
        description: '招聘信息页面UI开发',
        estimatedHours: 2,
        taskPoint: 6
      },
      {
        id: '13',
        title: '招聘发布自动化脚本',
        state: State.done,
        description: '招聘发布自动化脚本'
      }
    ]
  },
  // {
  //   id: '2',
  //   title: '作为一个求职者，我可以通过QQ和微信登录求职网站。',
  //   tasks: [
  //     {
  //       id: '14',
  //       title: '邮箱绑定',
  //       state: State.todo,
  //       description: '邮箱绑定',
  //       estimatedHours: 2,
  //       leader: 'Lucy'
  //     },
  //     {
  //       id: '15',
  //       title: '手机绑定',
  //       state: State.todo,
  //       description: '手机绑定',
  //       estimatedHours: 2,
  //       taskPoint: 6
  //     },
  //     {
  //       id: '16',
  //       title: '测试案例',
  //       state: State.todo,
  //       description: '测试案例',
  //       taskPoint: 6,
  //       leader: 'Lucy'
  //     },
  //     {
  //       id: '17',
  //       title: '自动化脚本',
  //       state: State.todo,
  //       description: '自动化脚本',
  //       estimatedHours: 2,
  //       taskPoint: 6
  //     },
  //     {
  //       id: '18',
  //       title: '第三方登录UI开发及前端脚本',
  //       state: State.doing,
  //       description: '第三方登录UI开发及前端脚本',
  //       estimatedHours: 2,
  //       leader: 'Lucy'
  //     },
  //     {
  //       id: '19',
  //       title: '微信登陆接口对接后台开发',
  //       state: State.doing,
  //       description: '微信登陆接口对接后台开发',
  //       taskPoint: 6,
  //       leader: 'Lucy'
  //     },
  //     {
  //       id: '20',
  //       title: 'QQ第三方登陆接口对接后台开发',
  //       state: State.done,
  //       description: 'QQ第三方登陆接口对接后台开发',
  //       estimatedHours: 2,
  //       leader: 'Lucy'
  //     },
  //   ]
  // },
];

let store = createStore<IStory[], IAction, IStory[], unknown>(reducer, initState);

export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}

export default store;