export default const typeDefs = `
  type todos {
    title: String
  }
  type Query {
    todos: [todos]
    users: [User]
  }
  type User {
    name: String!
    password: String!
    id: Int
  }
  type Mutation {
    addToDo(title: String!, token: String!): [todos]
    deleteToDo(index: Int!, token: String!): [todos]
    updateToDo(title: String!, index: Int!, token: String!): [todos]
    loginUser(username: String!, password: String!): AuthPayLoad!
  }
  input UserLoginInput {
    username: String!
    password: String!
  }
  type AuthPayLoad {
    token: String!
  }
`
