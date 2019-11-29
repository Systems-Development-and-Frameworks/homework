const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Todo {
    message: String
    completed: Boolean 
  }

  type Query {
    todos: [Todo]
  }
`;

const todos = [
  {
    message: 'Nichts tun',
    completed: false,
  },
  {
    message: 'Essen',
    completed: false,
  },
];
