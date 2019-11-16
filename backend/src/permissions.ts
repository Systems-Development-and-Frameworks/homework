import { AuthenticationError } from 'apollo-server';
import { TodoItem, User } from 'core';
import { Request } from 'express-serve-static-core';
import { rule, shield } from 'graphql-shield';

import { TodosArguments, TodoContext, TodoContextData } from './Interfaces';

const isAssigned = rule({ cache: 'contextual' })(
  async (parent: any, args?: TodosArguments, ctx?: TodoContext, info?: any) => {
    if (!ctx || !ctx.user || !ctx.user.name) {
      return false;
    }

    return ctx.data.todos.some((todo: TodoItem) => {
      return todo.assignedUser && todo.assignedUser.name && todo.assignedUser.name === ctx.user!.name;
    });
  },
);

export function getAuthUser(data: TodoContextData, req?: Request): User | undefined {
  const authToken = (req && req.get('Authorization')) || '';
  return data.users.find((user: User) => {
    return user.token === authToken;
  });
}

export const permissions = shield(
  {
    Query: {
      todos: isAssigned,
    },
  },
  { fallbackError: new AuthenticationError('Must be authenticated') },
);
