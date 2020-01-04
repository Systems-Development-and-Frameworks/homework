import { AuthenticationError } from 'apollo-server';
import { TodoItem, User } from '../../core';
import { Request } from 'express-serve-static-core';
import { rule, shield } from 'graphql-shield';

import { verify } from './jwt';
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

export async function getAuthUser(data: TodoContextData, req?: Request): Promise<User | undefined> {
  const authToken: string | undefined = (req && (req.headers.Authorization as string | undefined)) || undefined;
  if (authToken) {
    const userName = await verify(authToken.replace('Bearer ', ''));
    return data.users.find((user: User) => {
      return user.name === userName;
    });
  }
  return undefined;
}

export const permissions = shield(
  {
    Query: {
      todos: isAssigned,
    },
  },
  { fallbackError: new AuthenticationError('Must be authenticated') },
);
