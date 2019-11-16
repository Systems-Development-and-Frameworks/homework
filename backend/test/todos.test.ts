import { gql } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import { GraphQLResponse } from 'apollo-server-types';
import { v4String } from 'uuid/interfaces';

import { makeServer } from '../src/apollo';
import { DEFAULT_TODOS, DEFAULT_USERS } from '../src/data';
import uuid = require('uuid');

const testClient = createTestClient(
  makeServer({
    users: [...DEFAULT_USERS],
    todos: [...DEFAULT_TODOS],
  }),
);

describe('mutate', () => {
  describe('createTodo', () => {
    let response: GraphQLResponse;

    const genMethodBackup = uuid.v4;
    beforeAll(async () => {
      (uuid.v4 as v4String) = () => {
        return 'uuid';
      };

      const mutation = gql`
        mutation {
          createTodo(description: "test") {
            id
            description
            isDone
            assignedUser {
              name
            }
          }
        }
      `;

      response = await testClient.mutate({ mutation });
      uuid.v4 = genMethodBackup;
    });

    it('adds a new todo', () => {
      const data = (response.data && response.data.createTodo) || undefined;
      expect(data).toMatchObject({
        id: 'uuid',
        description: 'test',
        isDone: false,
        assignedUser: null,
      });
    });

    it('generates a random ID', () => {
      const id = (response.data && response.data.createTodo && response.data.createTodo.id) || undefined;
      expect(id).toBe('uuid');
    });

    it('initializes todo as not done', () => {
      const isDone =
        response.data && response.data.createTodo && typeof response.data.createTodo.isDone === 'boolean'
          ? response.data.createTodo.isDone
          : undefined;
      expect(isDone).toBe(false);
    });
  });

  describe('finishTodo', () => {
    it('rejects if ID is missing', async () => {
      const mutation = gql`
        mutation {
          finishTodo {
            id
            description
            isDone
            assignedUser {
              name
            }
          }
        }
      `;

      const response = await testClient.mutate({ mutation });
      expect(response.errors).toHaveLength(1);
    });

    describe('given an ID', () => {
      let response: GraphQLResponse;
      beforeAll(async () => {
        const mutation = gql`
          mutation {
            finishTodo(todoId: "uuid") {
              id
              description
              isDone
              assignedUser {
                name
              }
            }
          }
        `;

        response = await testClient.mutate({ mutation });
      });

      it('marks an existing todo as done', () => {
        const isDone =
          response.data && response.data.finishTodo && typeof response.data.finishTodo.isDone === 'boolean'
            ? response.data.finishTodo.isDone
            : undefined;
        expect(isDone).toBe(true);
      });
      it('returns entire todo', () => {
        const data = (response.data && response.data.finishTodo) || undefined;
        expect(data).toMatchObject({
          id: 'uuid',
          description: 'test',
          isDone: true,
          assignedUser: null,
        });
      });
    });
  });

  describe('deleteTodo', () => {
    describe('given an ID', () => {
      it('deletes a todo', async () => {
        const mutation = gql`
          mutation {
            deleteTodo(todoId: "uuid") {
              id
              description
              isDone
              assignedUser {
                name
              }
            }
          }
        `;

        const response = await testClient.mutate({ mutation });
        const data = (response.data && response.data.deleteTodo) || undefined;
        expect(data).toMatchObject({
          id: 'uuid',
          description: 'test',
          isDone: true,
          assignedUser: null,
        });
      });

      describe('buf if ID is invalid', () => {
        it('returns `null`', async () => {
          const mutation = gql`
            mutation {
              deleteTodo(todoId: "uuid") {
                id
                description
                isDone
                assignedUser {
                  name
                }
              }
            }
          `;

          const response = await testClient.mutate({ mutation });
          const data = response.data || undefined;
          expect(data).toMatchObject({
            deleteTodo: null,
          });
        });
      });
    });
  });
});

describe('query', () => {
  describe('todos', () => {
    it('returns a list of some todos', async () => {
      const query = gql`
        query {
          todos {
            description
            isDone
          }
        }
      `;

      const response = await testClient.query({ query });
      const data = response.data || undefined;
      expect(data).toMatchObject({
        todos: [
          {
            description: 'Number one',
            isDone: true,
          },
          {
            description: 'Number two',
            isDone: false,
          },
        ],
      });
    });

    describe('input arguments `options`', () => {
      describe('(isDone: false)', () => {
        it('returns unfinished todos only', async () => {
          const query = gql`
            query {
              todos(options: { isDone: false }) {
                description
                isDone
              }
            }
          `;

          const response = await testClient.query({ query });
          const data = response.data || undefined;
          expect(data).toMatchObject({
            todos: [
              {
                description: 'Number two',
                isDone: false,
              },
            ],
          });
        });
      });

      describe('(orderBy: "desc")', () => {
        it('orders todos by creation time in descending order', async () => {
          const query = gql`
            query {
              todos(options: { orderBy: "desc" }) {
                description
                isDone
              }
            }
          `;

          const response = await testClient.query({ query });
          const data = response.data || undefined;
          expect(data).toMatchObject({
            todos: [
              {
                description: 'Number one',
                isDone: true,
              },
              {
                description: 'Number two',
                isDone: false,
              },
            ],
          });
        });
      });

      describe('(orderBy: "asc")', () => {
        it('orders todos by creation time in ascending order', async () => {
          const query = gql`
            query {
              todos(options: { orderBy: "asc" }) {
                description
                isDone
              }
            }
          `;

          const response = await testClient.query({ query });
          const data = response.data || undefined;
          expect(data).toMatchObject({
            todos: [
              {
                description: 'Number two',
                isDone: false,
              },
              {
                description: 'Number one',
                isDone: true,
              },
            ],
          });
        });
      });
    });
  });
});
