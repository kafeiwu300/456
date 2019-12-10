import { BugState, ActionType } from "../enums";
import { Action } from "redux";
import { DragObjectWithType } from "react-dnd";
import { FormComponentProps } from "antd/lib/form/Form";

export interface IBug {
  id: string;
  title?: string;
  status?: BugState;
  description?: string;
  level?: "very high" | "high" | "middle" | "low";
  estimatedHours?: number;
  leader?: string;
}

export interface IDragObject extends DragObjectWithType {
  bug: IBug;
}

export interface IBugAction extends Action<ActionType> {
  projectId: string;
  data?: IBug[];
  bug: IBug;
  status: BugState;
}

export interface IBugFormComponentProps extends FormComponentProps<IBug> {
  bug?: IBug;
}

export interface IPage {
  pageNumber: number;
  currentList: JSX.Element[];
}
