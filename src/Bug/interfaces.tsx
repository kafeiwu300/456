import { BugState } from "../enums";

export interface IBug {
  id: string;
  title?: string;
  state?: BugState;
  description?: string;
  level?: "very high" | "high" | "middle" | "low";
  estimatedHours?: number;
  taskPoint?: number;
  leader?: string;
}
