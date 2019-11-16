import { User } from './User';

export interface TodoItem {
  id: string;
  description: string;
  isDone: boolean;
  assignedUser?: User;
  createdAt: Date | string;
}
