import { stitchSchemas } from '@graphql-tools/stitch';
import { applyMiddleware } from 'graphql-middleware';
import typeDefs from './typeDefs';
import Resolvers from './resolvers';
import permissions from './permissions';
import GraphCmsSchema, { executor } from './graphCms/schema';

export default async () => {
  const graphCmsSchema = await GraphCmsSchema();
  const resolvers = Resolvers([{ schema: graphCmsSchema, executor }]);

  let gatewaySchema = stitchSchemas({
    subschemas: [
      graphCmsSchema,
    ],
    typeDefs,
    resolvers,
  });
  gatewaySchema = applyMiddleware(gatewaySchema, permissions);
  return gatewaySchema;
};
