import { gql } from 'apollo-server';

const typeDefs = gql`
type Query {
  profile: Person
}

type Mutation {
  login(email: String!, password: String!): String
  signup(name: String!, email: String, password: String!): String
}

extend type Person {
  postCount: Int
}
`;
export default typeDefs;
