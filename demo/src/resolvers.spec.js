import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';
import Server from './server';

jest.mock('./graphCms/schema');

let query;
let contextMock;

beforeEach(async () => {
  contextMock = {};
  const server = await Server(ApolloServer, { context: () => contextMock });
  const testClient = createTestClient(server);
  ({ query } = testClient);
});

describe('queries', () => {
  describe('PEOPLE', () => {
    const PEOPLE = gql`
      {
        people {
          id
          name
        }
      }
    `;

    it('returns array of type `Person`', async () => {
      await expect(query({ query: PEOPLE }))
        .resolves
        .toMatchObject({
          errors: undefined,
          data: {
            people: [
              { id: expect.any(String), name: 'Hello World' },
              { id: expect.any(String), name: 'Hello World' },
            ],
          },
        });
    });
  });
});
