const {ApolloServer, gql} = require('apollo-server-express');
const {createTestClient} = require('apollo-server-testing');
const typeDefs = require('../schema.js');
const resolvers = require('../resolvers.js');

const server = new ApolloServer({
    typeDefs,
    resolvers
});


const {query, mutate} = createTestClient(server);

const CREATE_TODO = gql`
	mutation CreateTodo{
		addTodo(message: "Tests implementieren") {
			id,
            message,
			completed
        }
    }`;

const EDIT_TODO = gql`
	mutation EditTodo($id: ID!){
   		editTodo(id: $id, message: "Tests zweimal implementieren"){
   		id,
     	message,
     	completed
   		}
    }`;

const DELETE_TODO = gql`
	mutation DeleteTodo($id: ID!){
   		deleteTodo(id: $id)
    }`;

describe('Create Todo Item', () => {
    it("Creates a new Todo", async () => {
        const todo = await mutate({mutation: CREATE_TODO})
        expect(todo.data).toMatchObject(
            {"addTodo": {"id": "3", "message": "Tests implementieren", "completed": false}}
        )
    })
})

describe('Updates Todo Item', () => {
    it("Update a new Todo", async () => {
        const todo = await mutate({mutation: EDIT_TODO, variables: {id: 3}})
        expect(todo.data).toMatchObject(
            {"editTodo": {"id": "3", "message": "Tests zweimal implementieren", "completed": false}}
        )
    })
    it("Updates with wrong ID", async () => {
        const todo = await mutate({mutation: EDIT_TODO, variables: {id: 12}})
        expect(todo.data).toMatchObject(
            {"editTodo": null}
        )
    })
})

describe('Delete Todo', () => {
	it("deletes Todo", async () => {
		const todo = await mutate({mutation: DELETE_TODO, variables: {id: 3}})
		expect(todo.data).toMatchObject(
			{"deleteTodo": true}
		)
	})
	it("deletes Todo with wrong ID", async () => {
		const todo = await mutate({mutation: DELETE_TODO, variables: {id: 12}})
		expect(todo.data).toMatchObject(
			{"deleteTodo": false}
		)
	})
})


