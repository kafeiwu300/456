import { IStoryWithCase } from "./interface";

const data: IStoryWithCase[] = [
  {
    id: '1',
    title: '故事1',
    testCases: [
      {
        id: '1',
        title: '测试用例1'
      },
      {
        id: '2',
        title: '测试用例2'
      }
    ]
  },
  {
    id: '2',
    title: '故事2',
    testCases: [
      {
        id: '3',
        title: '测试用例3'
      },
      {
        id: '4',
        title: '测试用例4'
      },
      {
        id: '5',
        title: '测试用例5'
      }
    ]
  },
  {
    id: '3',
    title: '故事3',
    testCases: [
      {
        id: '6',
        title: '测试用例6'
      },
      {
        id: '7',
        title: '测试用例7'
      },
      {
        id: '8',
        title: '测试用例8'
      },
      {
        id: '9',
        title: '测试用例9'
      }
    ]
  }
];

export default data;