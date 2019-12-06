import { BugState, ActionType } from "../enums";
import { Action } from "redux";
import { DragObjectWithType } from "react-dnd";
import { FormComponentProps } from "antd/lib/form/Form";

export interface IBug {
  id: string;
  title?: string;
  state?: BugState;
  description?: string;
  level?: "very high" | "high" | "middle" | "low";
  estimatedHours?: number;
  leader?: string;
}

export interface IDragObject extends DragObjectWithType {
  bug: IBug;
}

export interface IBugAction extends Action<ActionType> {
  bug: IBug;
  state: BugState;
}

export interface IBugFormComponentProps extends FormComponentProps<IBug> {
  bug?: IBug;
}

export interface IPage {
  pageNumber: number;
  currentList: JSX.Element[];
}
