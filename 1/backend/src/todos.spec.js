const {ApolloServer, gql} = require('apollo-server-express');
const {createTestClient} = require('apollo-server-testing');

const typeDefs = require('./schema.js');
const resolvers = require('./resolvers.js');
const {getDriver} = require('./neo4j.js')

let query, mutate, test_id

const driver = getDriver()

beforeAll(async () => {
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
})

beforeEach(async() => {
    const todo = await mutate({mutation: CREATE_TODO, variables: {message: "Test"}})
    test_id = todo.data.addTodo.id
})

afterEach(async () => {
    await mutate({mutation: DELETE_TODO, variables: {id: test_id}})
})

const GET_TODOS = gql`
query AllTodos{
  todos(limit: 1){
    message
    completed
    id
  }
}`;

const GET_COMPLETED_TODOS = gql`
query CompletedTodos{
  completedTodos{
    message
    completed
    id
  }
}`;

const CREATE_TODO = gql`
	mutation CreateTodo($message: String!){
		addTodo(message: $message) {
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
    it("Receives one todo (LIMIT 1)", async () => {
        const todo = await query({query: GET_TODOS})
        expect(todo.data.todos).toHaveLength(1)
    })
})

describe('Get completed todos only (DESC)', () =>{
    let todo
    it("Receives all completed todos", async() => {
        const todo_c = await mutate({mutation: CREATE_TODO, variables: {message: "c"}})
        const todo_a = await mutate({mutation: CREATE_TODO, variables: {message: "a"}})
        const todo_b = await mutate({mutation: CREATE_TODO, variables: {message: "b"}})

        await mutate({mutation: FINISH_TODO, variables: {id: todo_c.data.addTodo.id}})
        await mutate({mutation: FINISH_TODO, variables: {id: todo_a.data.addTodo.id}})
        await mutate({mutation: FINISH_TODO, variables: {id: todo_b.data.addTodo.id}})

        todo = await query({query: GET_COMPLETED_TODOS})
        expect(todo.data.completedTodos[0].completed).toEqual(true)
        expect(todo.data.completedTodos[1].completed).toEqual(true)
        expect(todo.data.completedTodos[2].completed).toEqual(true)

        await mutate({mutation: DELETE_TODO, variables: {id: todo_c.data.addTodo.id}})
        await mutate({mutation: DELETE_TODO, variables: {id: todo_a.data.addTodo.id}})
        await mutate({mutation: DELETE_TODO, variables: {id: todo_b.data.addTodo.id}})

    })
})

describe('Create Todo Item', () => {
    it("Creates a new Todo", async () => {
        const todo = await mutate({mutation: CREATE_TODO, variables: {message: "test"}})
        expect(todo.data.addTodo.id).toEqual(expect.any(String))
        await mutate({mutation: DELETE_TODO, variables: {id: todo.data.addTodo.id}})
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
