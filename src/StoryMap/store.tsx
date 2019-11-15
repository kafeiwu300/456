import { IIteration, IEpic } from "./interfaces";

let epics: IEpic[] = [
  {
    id: '0',
    title: '添加产品',
    stories: [
      {
        id: '1',
        title: 'test',
        iterationId: '2',
      }
    ]
  },
  {
    id: '1',
    title: '查看购物车',
    stories: []
  },
  {
    id: '2',
    title: '编辑购物车',
    stories: []
  },
  {
    id: '3',
    title: '下单',
    stories: []
  }
];

let iterations: IIteration[] = [
  {
    id: '0',
    index: 1,
    title: '最小可行的购物车'
  },
  {
    id: '1',
    index: 2,
    title: '增强版的购物车'
  },
  {
    id: '2',
    index: 3,
    title: '豪华版的购物车'
  }
];

export default {epics, iterations};