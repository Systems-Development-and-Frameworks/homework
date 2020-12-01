import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { join } from 'path';
import { addMocksToSchema } from '@graphql-tools/mock';

export default async () => {
  const schema = await loadSchema(join(__dirname, 'schema.gql'), {
    loaders: [
      new GraphQLFileLoader(),
    ],
  });
  return addMocksToSchema({ schema });
};
