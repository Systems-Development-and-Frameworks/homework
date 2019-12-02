const {ApolloServer, gql} = require('apollo-server-express');
const {createTestClient} = require('apollo-server-testing');
const typeDefs = require('../schema.js');
const resolvers = require('../resolvers.js');

const server = new ApolloServer({
	typeDefs,
	resolvers
});


const { query, mutate } = createTestClient(server);

const CREATE_TODO = gql`
       	mutation CreateTodo{
               	addTodo(message: "Tests implementieren") {
			id,
                       	message,
			completed
               	}
       	}
`;
	
describe('Create Todo Item', () => {
	it("Creates a new Todo", async () => {
		const todo = await mutate({mutation: CREATE_TODO})
		expect(todo.data).toMatchObject(
			{ "addTodo": {"id": "3", "message": "Tests implementieren", "completed": false }}
		)
	})
});


