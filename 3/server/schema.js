const { gql } = require('apollo-server');
	
const typeDefs = gql`
type Query {
  todos: [Todo]!
  todo(id: ID!): Todo 
}

type Todo {
	id: ID!
	message: String
	completed: Boolean
}

type Mutation {
	addTodo(todoId: ID!): UpdateTodoResponse!
	finishTodo(todoId: ID!): UpdateTodoResponse!
	deleteTodo(todoId: ID!): UpdateTodoResponse!
}		

type UpdateTodoResponse {
  success: Boolean!
  message: String
  todos: [Todo]
}
`;



module.exports = typeDefs;
