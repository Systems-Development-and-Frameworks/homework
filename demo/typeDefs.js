import { gql } from 'apollo-server'
const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
  }

  type Query {
    posts: [Post]
    promises: [Promise]
  }

  type Mutation {
    write(title: String!): Post
  }

  type Promise {
    id: ID!
    nested: Promise
  }
`

export default typeDefs
