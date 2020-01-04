import { gql, makeExecutableSchema, ApolloServer } from 'apollo-server';
import { createTestClient, ApolloServerTestClient } from 'apollo-server-testing';
import { TodoItem } from '../../core';
import { Request } from 'express-serve-static-core';
import { applyMiddleware } from 'graphql-middleware';

import { makeServerWithMiddlewares, resolvers, typeDefs } from '../src/apollo';
import { DEFAULT_TODOS, DEFAULT_USERS } from '../src/data';
import { sign } from '../src/jwt';
import { getAuthUser, permissions } from '../src/permissions';
import { TodoContext, TodoContextData } from '../src/Interfaces';

function makeAuthorizedServerWithMiddlewares(): ApolloServer {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const schemaWithMiddlewares = applyMiddleware(schema, permissions);
  return new ApolloServer({
    schema: schemaWithMiddlewares,
    context: async (ctx: TodoContext, req?: Request) => {
      const data: TodoContextData = {
        todos: [...DEFAULT_TODOS],
        users: [...DEFAULT_USERS],
      };

      const authToken = await sign(data.users[0]);
      if (req) {
        req.headers.Authorization = `Bearer ${authToken}`;
      } else {
        // for test only make a custom request-object
        req = {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        } as any;
      }

      return {
        ...ctx,
        user: await getAuthUser(data, req),
        data: { ...data },
      };
    },
  });
}

describe('query', () => {
  let testClient: ApolloServerTestClient;

  describe('todos', () => {
    describe('given there are todos assigned to different users', () => {
      describe('request `{ todos { description assignedUser { name } } }`', () => {
        beforeAll(() => {
          testClient = createTestClient(makeAuthorizedServerWithMiddlewares());
        });

        it(`returns assigned users' names`, async () => {
          const query = gql`
            query {
              todos {
                description
                assignedUser {
                  name
                }
              }
            }
          `;
          expect(await testClient.query({ query })).toMatchObject({
            http: {
              headers: {},
            },
            data: {
              todos: [
                {
                  description: 'Number one',
                  assignedUser: {
                    name: 'test',
                  },
                },
                {
                  description: 'Number two',
                  assignedUser: {
                    name: 'test',
                  },
                },
              ],
            },
          });
        });
      });

      describe('request `{ todos { description isDone } }`', () => {
        describe('if you have been assigned', () => {
          beforeAll(() => {
            testClient = createTestClient(makeAuthorizedServerWithMiddlewares());
          });

          it('shows if a todo is done', async () => {
            const query = gql`
              query {
                todos {
                  description
                  isDone
                }
              }
            `;

            const response = await testClient.query({ query });
            const data = (response.data && response.data.todos) || [];
            expect(
              data.filter((todo: TodoItem) => {
                return typeof todo.isDone !== 'undefined';
              }),
            ).toHaveLength(2);
          });
        });

        describe('if you have not been assigned', () => {
          beforeAll(() => {
            testClient = createTestClient(
              makeServerWithMiddlewares({ users: [...DEFAULT_USERS], todos: [...DEFAULT_TODOS] }),
            );
          });

          it('throws AuthorizationError', async () => {
            const query = gql`
              query {
                todos {
                  description
                  isDone
                }
              }
            `;

            const response = await testClient.query({ query });
            const errors = response.errors || [];
            const code = (errors[0] && errors[0].extensions && errors[0].extensions.code) || '';
            expect(errors).toHaveLength(1);
            expect(code).toBe('UNAUTHENTICATED');
          });
        });
      });
    });
  });
});
