const {ApolloServer, gql} = require('apollo-server-express');
const {createTestClient} = require('apollo-server-testing');
const typeDefs = require('./schema.js');
const resolvers = require('./resolvers.js');
const jwt = require('jsonwebtoken');
const fs = require('fs');
var SECRET_KEY = fs.readFileSync('./src/key/secret.key', 'utf8');

let token, mutate

beforeAll(async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => {
            return {
                token: "meinsupertoken"
            }
        }
    });

    const client = createTestClient(server);
    mutate = client.mutate
    let res = await mutate({
        mutation: LOGIN
    });
    token = res.data.login.token;
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
        const todo = await mutate({mutation: GET_TODOS})
        expect(todo.data).toMatchObject(
            {
                "todos": [
                    {
                        "message": "Einkaufen",
                        "completed": false,
                        "id": "1"
                    },
                    {
                        "message": "Apollo Server aufsetzen",
                        "completed": false,
                        "id": "2"
                    }
                ]
            }
        )
    })
})

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
        const todo = await mutate({mutation: DELETE_TODO, variables: {id: 2}})
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

describe('Finish Todo', () => {
    it("finishes Todo", async () => {
        const todo = await mutate({mutation: FINISH_TODO, variables: {id: 1}})
        expect(todo.data).toMatchObject(
            {
                "finishTodo": {
                    "id": "1",
                    "message": "Einkaufen",
                    "completed": true
                }
            }
        )
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

