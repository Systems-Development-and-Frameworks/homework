import { ApolloServer } from 'apollo-server';
import { gql, UserInputError } from 'apollo-server-core';
import { TodoItem, Util } from 'core';
import { DocumentNode } from 'graphql';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema, IResolvers } from 'graphql-tools';
import uuid = require('uuid');

import { getAuthUser, permissions } from './permissions';
import {
  CreateTodoArguments,
  DeleteTodoArguments,
  FinishTodoArguments,
  TodosArguments,
  TodoContext,
  TodoContextData,
} from './Interfaces';

export const typeDefs: DocumentNode = gql`
  type TodoItem {
    id: ID
    description: String
    isDone: Boolean
    assignedUser: User
    createdAt: String
  }

  type User {
    id: ID
    name: String
    assignedTo: [TodoItem]
  }

  input TodosOptionsInput {
    isDone: Boolean
    orderBy: String
  }

  type Query {
    todos(options: TodosOptionsInput): [TodoItem]
  }

  type Mutation {
    createTodo(description: String!): TodoItem!

    finishTodo(todoId: ID!): TodoItem!

    deleteTodo(todoId: ID): TodoItem
  }
`;

export const resolvers: IResolvers = {
  Query: {
    todos(parent: any, args?: TodosArguments, ctx?: TodoContext) {
      let todosCopy = ctx!.data.todos.slice();
      const isDone =
        args && args.options && typeof args.options.isDone !== 'undefined' ? args.options.isDone : undefined;
      const orderBy = args && args.options && args.options.orderBy ? args.options.orderBy.toLowerCase() : undefined;

      if (ctx!.user && ctx!.user.name) {
        todosCopy = todosCopy.filter((item: TodoItem) => {
          return item.assignedUser && item.assignedUser.name && item.assignedUser.name === ctx!.user!.name;
        });
      }

      if (typeof isDone === 'boolean') {
        todosCopy = todosCopy.filter((item: TodoItem) => {
          return item.isDone === isDone;
        });
      }

      if (typeof orderBy === 'string') {
        if (orderBy === 'asc' || orderBy === 'desc') {
          todosCopy = todosCopy.sort((itemA: TodoItem, itemB: TodoItem) => {
            const timeA = Util.itemDateToDate(itemA.createdAt).getTime();
            const timeB = Util.itemDateToDate(itemB.createdAt).getTime();

            if (timeA < timeB) {
              return orderBy === 'asc' ? -1 : 1;
            }
            if (timeA > timeB) {
              return orderBy === 'asc' ? 1 : -1;
            }

            return 0;
          });
        } else {
          throw new UserInputError(
            `Argument 'orderBy' is invalid. It has to be either 'asc' or 'desc'. Casing is ignored.`,
            {
              invalidArgs: 'orderBy',
            },
          );
        }
      }

      return todosCopy;
    },
  },
  Mutation: {
    createTodo(parent: any, args?: CreateTodoArguments, ctx?: TodoContext) {
      const description = args!.description;
      const id = uuid.v4();

      const todoItem: TodoItem = {
        id,
        description,
        isDone: false,
        createdAt: Util.itemDateToString(new Date()),
      };

      ctx!.data.todos.push(todoItem);

      return todoItem;
    },

    finishTodo(parent: any, args?: FinishTodoArguments, ctx?: TodoContext) {
      const todos = ctx!.data.todos;
      const id = args!.todoId;

      const index = todos.findIndex((item: TodoItem) => {
        return item.id === id;
      });

      if (index < 0) {
        throw new UserInputError(`Argument 'id' is invalid. No todo with id '${id}' exists.`, {
          invalidArgs: 'id',
        });
      }

      todos[index].isDone = true;

      return todos[index];
    },

    deleteTodo(parent: any, args?: DeleteTodoArguments, ctx?: TodoContext) {
      const todos = ctx!.data.todos;
      const id = (args && args.todoId) || undefined;

      if (!id) {
        return null;
      }

      const index = todos.findIndex((item: TodoItem) => {
        return item.id === id;
      });

      if (index < 0) {
        return null;
      }

      return todos.splice(index, 1)[0];
    },
  },
};

export function makeServer(data: TodoContextData): ApolloServer {
  return new ApolloServer({
    typeDefs,
    resolvers,
    context: (ctx) => ({
      ...ctx,
      data: { ...data },
    }),
  });
}

export function makeServerWithMiddlewares(data: TodoContextData): ApolloServer {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const schemaWithMiddlewares = applyMiddleware(schema, permissions);
  return new ApolloServer({
    schema: schemaWithMiddlewares,
    context: (ctx) => ({
      ...ctx,
      user: { ...getAuthUser(data, ctx.req) },
      data: {
        ...data,
      },
    }),
  });
}
