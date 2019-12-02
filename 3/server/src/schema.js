const { gql } = require('apollo-server');
	
const typeDefs = gql`
type Query {
  todos: [Todo]
}

type Todo {
	id: ID!
	message: String!
	completed: Boolean!
}

type Mutation {
	addTodo(message: String!): Todo
	finishTodo(id: ID!): Todo
	deleteTodo(id: ID!): Boolean
	editTodo(id: ID!, message: String!): Todo
	login(usr: String!, pwd: String!): String
}		
`;



module.exports = typeDefs;
