import { gql } from 'apollo-server';

const typeDefs = gql`
type Query {
  profile: Person
}

type Mutation {
  login(personId: ID!): String
}

extend type Person {
  postCount: Int
}
`;
export default typeDefs;
