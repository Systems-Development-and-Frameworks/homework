import { ApolloServer } from 'apollo-server';
import { gql, UserInputError } from 'apollo-server-core';
import { TodoItem, User, Util } from 'core';
import { DocumentNode } from 'graphql';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema, IResolvers } from 'graphql-tools';
import neo4j, { Session, Transaction } from 'neo4j-driver';
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
    getUserByName(name: String!): User
  }

  type Mutation {
    createTodo(description: String!): TodoItem!

    finishTodo(id: ID!): TodoItem!

    deleteTodo(id: ID!): TodoItem
  }
`;

export const resolvers: IResolvers = {
  Query: {
    async todos(parent: any, args?: TodosArguments, ctx?: any) {
      const session: Session = ctx.driver.session();
      const isDone = args!.options!.isDone !== undefined ? args!.options!.isDone : undefined;
      const orderBy = args!.options!.orderBy !== undefined ? args!.options!.orderBy : undefined;

      let cypherStatement = `MATCH(todos: TodoItem) `;
      if (isDone !== undefined) {
        cypherStatement += `WHERE todos.isDone = ${isDone} `;
      }
      cypherStatement += `RETURN todos `;

      if (orderBy !== undefined) {
        cypherStatement += `ORDER BY (todos.createdAt) ${orderBy} LIMIT 25`;
      }
      console.log(cypherStatement);
      const todoItems: any[] = [];
      try {
        const resultPromise = session.readTransaction(async (transaction) => {
          const queryResult = await transaction.run(cypherStatement);

          if (queryResult !== null) {
            return queryResult.records.map((record) => ({
              todoItems: record.get('todos').properties
            }));
          }
          return;
        });

        const results = await resultPromise;
        if (results !== undefined) {
          results.forEach((result) => {
            todoItems.push(result.todoItems);
          });
        }

        return todoItems;
      } finally {
        session.close();
      }
    },
    async getUserByName(parent: any, args?: any, ctx?: any) {

      const session: Session = ctx.driver.session();

      if (args.name !== '' && args.name !== null && args.name !== undefined) {

        let user: User;

        try {
          const resultPromise = session.writeTransaction(async (transaction) => {
            const queryResult = await transaction.run(
              `
              MATCH(user: User) WHERE user.name = $name
              RETURN user
              `,
              {name: String(args.name) },
            );
            if (queryResult !== null) {
              return queryResult.records.map((record) => ({
                user: record.get('user').properties,
              }));
            }
            return;
          });

          const result = await resultPromise;

          user = result![0] !== undefined ? result![0].user : null;

          return user;
        } finally {
          session.close();
        }
      }
    }
  },
  Mutation: {
    async createTodo(parent: any, args?: any, ctx?: any) {
      const description = args!.description;
      const id = uuid.v4();
      const session: Session = ctx.driver.session();
      let todoItem: TodoItem;

      const todoItemTemplate: TodoItem = {
        id,
        description,
        isDone: false,
        createdAt: Util.itemDateToString(new Date()),
      };

      try {
        const resultPromise = session.writeTransaction(async (transaction) => {
          const mutationResult = await transaction.run(
            `
            MERGE (todoItem: TodoItem { id: $id, description: $description, isDone: $isDone, createdAt: $createdAt}) RETURN todoItem
            `,
            {id: todoItemTemplate.id,
            description: String(todoItemTemplate.description),
            isDone: Boolean(todoItemTemplate.isDone),
            createdAt: String(todoItemTemplate.createdAt)},
          );
          if (mutationResult !== null) {
            return mutationResult.records.map((record) => ({
              todoItem: record.get('todoItem').properties,
            }));
          }
          return;
        });
        const result = await resultPromise;

        todoItem = result![0] !== undefined ? result![0].todoItem : null;

        return todoItem;
      } finally {
        session.close();
      }
    },

    async finishTodo(parent: any, args?: any, ctx?: any) {
      
      const id = args!.id;
      const session: Session = ctx.driver.session();
      let finishedTodo: TodoItem;

      try {
        const resultPromise = session.writeTransaction(async (transaction) => {
          const mutationResult = await transaction.run(
            `
            MATCH(todoItem: TodoItem { id: $id})
            SET todoItem.isDone = true
            RETURN todoItem 
            `,
            {id: String(id)}
          );
          if (mutationResult !== null) {
            return mutationResult.records.map((record) => ({
              finishedTodo: record.get('todoItem').properties,
            }));
          }
          return;
        });
        const result = await resultPromise;

        finishedTodo = result![0] !== undefined ? result![0].finishedTodo : null;

        return finishedTodo;
      } finally {
        session.close();
      }
    },

    async deleteTodo(parent: any, args?: any, ctx?: any) {
      const id = args!.id;
      console.log(id);
      const session: Session = ctx.driver.session();
      let deletedTodo: TodoItem;

      try {
        const resultPromise = session.writeTransaction(async (transaction) => {
          const mutationResult = await transaction.run(
            `
            MATCH(todoItem: TodoItem { id: $id})
            DELETE (todoItem)
            RETURN (todoItem) 
            `,
            {id: String(id)}
          );
          if (mutationResult !== null) {
            return mutationResult.records.map((record) => ({
              deletedTodo: record.get('todoItem').properties,
            }));
          }
          return;
        });
        const result = await resultPromise;

        deletedTodo = result![0] !== undefined ? result![0].deletedTodo : null;

        return deletedTodo;
      } finally {
        session.close();
      }
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

const uri = 'bolt://localhost:7687';
const user = 'neo4j';
const password = '12345';
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
export function makeNeo4jTestServer(data: any): ApolloServer {
  const server = new ApolloServer({
    schema: makeExecutableSchema({typeDefs, resolvers}),
    context: ({ req }) => {
      return {
        driver,
        token: data
      };
    }
  });

  return server;
}

export function makeServerWithMiddlewares(data: TodoContextData): ApolloServer {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const schemaWithMiddlewares = applyMiddleware(schema, permissions);
  return new ApolloServer({
    schema: schemaWithMiddlewares,
    context: async (ctx) => ({
      ...ctx,
      user: await getAuthUser(data, ctx.req),
      data: {
        ...data,
      },
    }),
  });
}
