import { stitchSchemas } from '@graphql-tools/stitch';
import { applyMiddleware } from 'graphql-middleware';
import typeDefs from './typeDefs';
import Resolvers from './resolvers';
import permissions from './permissions';
import GraphCmsSchema from './graphCms/schema';

export default async () => {
  const graphCmsSchema = await GraphCmsSchema();
  const resolvers = Resolvers({ subschema: graphCmsSchema });

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
