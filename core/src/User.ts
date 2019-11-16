import { TodoItem } from './TodoItem';

export interface User {
  name: string;
  assignedTo: TodoItem[];
  token: string;
}
