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
  level?: number
}

export interface ITestPlanFormComponentProps extends FormComponentProps<ITestPlanDTO> {
  initialValue?: ITestPlanDTO;
  testCases: ITestCase[];
  // stories: IStoryInfo[];
}

export interface ITestCaseFormComponentProps extends FormComponentProps<ITestCase> {
  initialValue?: ITestCase; 
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