import { gql } from 'apollo-server'
const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
  }

  type Query {
    posts: [Post]
  }

  type Mutation {
    write(title: String!): Post
  }
`

export default typeDefs
