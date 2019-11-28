import { IStoryInfo } from "../Kanban/interfaces";

export interface IStoryWithCase extends IStoryInfo {
  testCases: ITestCase[]
}

export interface ITestCase {
  id: string,
  title: string
}