import { stitchSchemas } from '@graphql-tools/stitch';
import { applyMiddleware } from 'graphql-middleware';
import { FilterObjectFields } from '@graphql-tools/wrap';
import typeDefs from './typeDefs';
import Resolvers from './resolvers';
import permissions from './permissions';
import GraphCmsSchema, { executor } from './graphCms/schema';

export default async () => {
  const transforms = [
    new FilterObjectFields((typeName, fieldName) => (typeName !== 'Person' || fieldName !== 'passwordHash')),
  ];
  const graphCmsSchema = await GraphCmsSchema();
  const resolvers = Resolvers([{ schema: graphCmsSchema, executor }]);

  let gatewaySchema = stitchSchemas({
    subschemas: [
      { schema: graphCmsSchema, transforms },
    ],
    typeDefs,
    resolvers,
  });
  gatewaySchema = applyMiddleware(gatewaySchema, permissions);
  return gatewaySchema;
};
