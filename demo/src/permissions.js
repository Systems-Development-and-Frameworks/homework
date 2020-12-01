import { ForbiddenError } from 'apollo-server';

import {
  rule, shield, allow, deny,
} from 'graphql-shield';

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, context) => !!context.person.id,
);

const permissions = shield({
  Query: {
    '*': deny,
    profile: isAuthenticated,
    posts: allow,
    post: allow,
    people: allow,
    person: allow,
  },
  Mutation: {
    '*': deny,
    login: allow,
  },
}, {
  allowExternalErrors: true,
  fallbackRule: allow,
  fallbackError: new ForbiddenError('Not Authorised!'),
});

export default permissions;
