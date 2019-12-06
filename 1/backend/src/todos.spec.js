const {ApolloServer, gql} = require('apollo-server-express');
const {createTestClient} = require('apollo-server-testing');
const neo4j = require('neo4j-driver');
const typeDefs = require('./schema.js');
const resolvers = require('./resolvers.js');

let query, mutate

let driver, test_id;
const uri = "bolt://127.0.0.1:7687";
const username = "neo4j";
const password = "neo4j";

if (!driver) {
    driver = neo4j.driver(uri, neo4j.auth.basic(username, password))
}



beforeEach(async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => {
            return {
                token: "meinsupertoken",
                driver
            }
        }
    });

    const client = createTestClient(server);
    mutate = client.mutate
    query = client.query
    let res = await mutate({
        mutation: LOGIN
    });
})

beforeEach(async () => {
    const todo = await mutate({mutation: CREATE_TODO})
    test_id = todo.data.addTodo.id
})

afterEach(async () => {
    await mutate({mutation: DELETE_TODO, variables: {id: test_id}})
})

const LOGIN = gql`
	mutation FirstLogin{
  login(usr:"dducky", pwd:"phantomiasiscool")
}`;

const GET_TODOS = gql`
query AllTodos{
  todos{
    message
    completed
    id
  }
}`;

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

const FINISH_TODO = gql`
	mutation FinishTodo($id: ID!){
   		finishTodo(id: $id) {
   		    id,
   		    message,
   		    completed
   		}
    }`;


describe('Get Todo', () => {
    it("Receives all Todos", async () => {
        const todo = await query({query: GET_TODOS})
        expect(todo.data).toHaveProperty("todos")
    })
})

describe('Create Todo Item', () => {
    it("Creates a new Todo", async () => {
        const todo = await mutate({mutation: CREATE_TODO})
        expect(todo.data.addTodo.id).toEqual(expect.any(String))
    })
})

describe('Updates Todo Item', () => {
    it("Update a new Todo", async () => {
        const todo = await mutate({mutation: EDIT_TODO, variables: {id: test_id}})
        expect(todo.data.editTodo.id).toEqual(expect.any(String))
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
        const todo = await mutate({mutation: DELETE_TODO, variables: {id: test_id}})
        expect(todo.data).toMatchObject(
            {"deleteTodo": true}
        )
    })
    it("deletes Todo with wrong ID", async () => {
        const todo = await mutate({mutation: DELETE_TODO, variables: {id: 12}})
        expect(todo.data).toMatchObject(
            {"deleteTodo": true}
        )
    })
})

describe('Finish Todo', () => {
    it("finishes Todo", async () => {
        const todo = await mutate({mutation: FINISH_TODO, variables: {id: test_id}})
        expect(todo.data.finishTodo.id).toEqual(expect.any(String))
    })
    it("finishes Todo with wrong ID", async () => {
        const todo = await mutate({mutation: FINISH_TODO, variables: {id: 4}})
        expect(todo.data).toMatchObject(
            {
                "finishTodo": null
            }
        )
    })
})
