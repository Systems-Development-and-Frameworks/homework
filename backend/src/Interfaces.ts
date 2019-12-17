import { Context } from 'apollo-server-core';
import { TodoItem, User } from 'core';

export interface TodosArguments {
  options?: {
    isDone?: boolean;
    orderBy?: 'asc' | 'desc';
  };
}

export interface CreateTodoArguments {
  description: string;
}

export interface FinishTodoArguments {
  todoId: string;
}

export interface DeleteTodoArguments {
  todoId?: string;
}

export interface TodoContextData {
  todos: TodoItem[];
  users: User[];
}

export type TodoContext = Context & {
  user?: User;
  data: TodoContextData;
};
