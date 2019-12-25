import { IStoryInfo } from "../Kanban/interfaces";
import { FormComponentProps } from "antd/lib/form";

export interface IStoryWithCase extends IStoryInfo {
  testCases: ITestCase[]
}

export interface ITestCase {
  id?: string,
  title?: string,
  description?: string,
  procedure?: string,
  precondition?: string,
  expectation?: string,
  level?: number,
  leader?: string,
  storyId?: string
}

export interface ITestPlanFormComponentProps extends FormComponentProps<ITestPlanDTO> {
  initialValue?: ITestPlanDTO;
  testCases: ITestCase[];
  // stories: IStoryInfo[];
}

export interface ITestCaseFormComponentProps extends FormComponentProps<ITestCase> {
  initialValue?: ITestCase;
  stories: IStoryInfo[];
  readonly?: boolean;
}

export interface ITestPlanDTO {
  id?: string;
  title?: string;
  caseIds?: string[];
}

export interface ITestPlan {
  id?: string;
  title?: string;
}

export interface ITestResult {
  id: string;
  result: boolean;
  note: string;
  testCase: ITestCase;
}

export interface IDetailedTestPlan extends ITestPlan {
  testResultList: ITestResult[];
}