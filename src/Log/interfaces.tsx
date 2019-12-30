export interface IActivity {
  action: string;
  id: string;
  newStatus: string;
  oldStatus: string;
  note: string;
  foreignType: string;
  foreignTitle: string;
  createTime: number;
  createUser: string;
}