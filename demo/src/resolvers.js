import { delegateToSchema } from '@graphql-tools/delegate';

export default ({ subschema }) => ({
  Query: {
    profile: (parent, args, context, info) => delegateToSchema({
      schema: subschema,
      operation: 'query',
      fieldName: 'person',
      args: {
        where: { id: context.person.id },
      },
      context,
      info,
    }),
  },
  Mutation: {
    login: (parent, args, context) => {
      const { personId } = args;
      return context.jwtSign({ person: { id: personId } });
    },
  },
  Person: {
    postCount: {
      selectionSet: '{ posts { id } }',
      resolve: (person) => person.posts.length,
    },
  },
});
