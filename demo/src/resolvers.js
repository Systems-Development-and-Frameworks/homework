import { delegateToSchema } from '@graphql-tools/delegate';
import { UserInputError, AuthenticationError, gql } from 'apollo-server';
import bcrypt from 'bcrypt';

export default ([{ schema, executor }]) => ({
  Query: {
    profile: (_parent, _args, context, info) => delegateToSchema({
      schema,
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
    signup: async (_parent, args, context) => {
      const document = gql`
      mutation ($name: String!, $email: String!, $passwordHash: String!) {
        createPerson(data: {name: $name, email: $email, passwordHash: $passwordHash}) {
          id
        }
      }
      `;
      const { name, email, password } = args;
      const passwordHash = bcrypt.hashSync(password, 10);
      const variables = { name, email, passwordHash };
      const response = await executor({ document, variables });
      const { data, errors } = response;
      if (errors) throw new UserInputError(errors.map((e) => e.message).join('\n'));
      return context.jwtSign({ person: { id: data.createPerson.id } });
    },
    login: async (_parent, args, context) => {
      const document = gql`
      query ($email: String!) {
        person(where: {email: $email}) {
          id
          passwordHash
        }
      }
      `;
      const response = await executor({ document, variables: args });
      const { data, errors } = response;
      if (errors) throw new UserInputError(errors.map((e) => e.message).join('\n'));
      const { person } = data;
      if (person && bcrypt.compareSync(args.password, person.passwordHash)) {
        return context.jwtSign({ person: { id: person.id } });
      }
      throw new AuthenticationError('Wrong email/password combination');
    },
  },
  Person: {
    postCount: {
      selectionSet: '{ posts { id } }',
      resolve: (person) => person.posts.length,
    },
  },
});
