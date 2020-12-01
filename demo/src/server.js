import Schema from './schema';
import context from './context';

export default async (ApolloServer, opts) => {
  const schema = await Schema();
  const server = new ApolloServer({ schema, context, ...opts });
  return server;
};
