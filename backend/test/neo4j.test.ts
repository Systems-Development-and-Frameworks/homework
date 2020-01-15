import { gql } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';

import { makeNeo4jTestServer } from '../src/apollo';
import { CreateTodoArguments, TodosArguments } from '../src/Interfaces';

let query: any;
let mutate: any;
/**
 * Setup test data
 */
describe('queries and mutations', () => {
    beforeEach(async () => {
        const neo4jTestServer = makeNeo4jTestServer({});
        const client = createTestClient(neo4jTestServer);
        query = client.query;
        mutate = client.mutate;
    });

    describe('Retrieve User "Anderson"', () => {

        it('Retrieves the user Anderson', async () => {
            // 10 stunden rumprobieren warum der beknackte Name nicht in die query geht
            // und dann liegt es daran weil das Objekt variables heißen muss
            const variables = { name: 'Anderson' };
            const getUserByName = gql`
            query getUserByName($name: String!){
                getUserByName(name: $name){
                    id
                    name
                }
            }
             `;

            const expected = {
                errors: undefined,
                data: {
                    getUserByName: {
                        id: expect.any(String),
                        name: 'Anderson'
                    }
                }
            };
            await expect(query({ query: getUserByName, variables })).resolves.toMatchObject(expected);
        });
    });

    describe('retrieve all todos', () => {
        it('retrieves all todos without options', async () => {

            const todosOptions: TodosArguments = {
                options: {
                }
            };
            const variables = todosOptions;

            const todos = gql`
                query todos($options: TodosOptionsInput){
                    todos(options: $options){
                        id
                        description
                        isDone
                        assignedUser{
                            id
                        }
                        createdAt
                    }
                }
            `;
            const queryResult = await query({ query: todos, variables });
            expect(queryResult.data.todos.length).toBe(5);
        });
        it('retrieves one todo if isDone is true', async () => {
            const todosOptions: TodosArguments = {
                options: {
                    isDone: true
                }
            };
            const variables = todosOptions;

            const todos = gql`
                query todos($options: TodosOptionsInput){
                    todos(options: $options){
                        id
                        description
                        isDone
                        assignedUser{
                            id
                        }
                        createdAt
                    }
                }
            `;
            const queryResult = await query({ query: todos, variables });
            expect(queryResult.data.todos.length).toBe(1);
        });
        it('orders the todos by creation date desc', async () => {
            const todosOptions: TodosArguments = {
                options: {
                    orderBy: 'desc'
                }
            };
            const variables = todosOptions;

            const todos = gql`
                query todos($options: TodosOptionsInput){
                    todos(options: $options){
                        id
                        description
                        isDone
                        assignedUser{
                            id
                        }
                        createdAt
                    }
                }
            `;
            const queryResult = await query({ query: todos, variables });
            const todosAreOrderedDesc = queryResult.data.todos[0].createdAt > queryResult.data.todos[1].createdAt;
            expect(todosAreOrderedDesc).toBe(true);
        });
    });

    describe('create new todo', () => {
        it('LIVES', async () => {

            const variables = { description: 'I AM ALIVE' };

            const createTodo = gql`
                mutation createTodo($description: String!){
                    createTodo(description: $description){
                        id
                        description
                    }
                }
            `;
            const mutationResult = await mutate({ mutation: createTodo, variables });
            const itIsAlive = mutationResult.data.createTodo.description === 'I AM ALIVE';
            expect(itIsAlive).toBe(true);
        });
    });
    describe('delete todo', () => {
        it('gets deleted', async () => {
            const variables = { id: 1 };
            const deleteTodo = gql`
                mutation deleteTodo($id: ID!){
                    deleteTodo(id: $id){
                        id
                    }
                }
            `;
            const mutationResult = await mutate({ mutation: deleteTodo, variables });
            console.log(mutationResult);
            const itIsDeadJim = mutationResult.data.deleteTodo.id === null;
            expect(itIsDeadJim).toBe(true);
        })
    })
    describe('finish todo', () => {
        it('gets finished', async () => {
            const variables = { id: 4 };
            const finishTodo = gql`
                mutation finishTodo($id: ID!){
                    finishTodo(id: $id){
                        id
                        isDone
                    }
                }
            `;
            const mutationResult = await mutate({ mutation: finishTodo, variables });
            console.log(mutationResult);
            const itChanged = mutationResult.data.finishTodo.isDone === true;
            expect(itChanged).toBe(true);
        })
    })
});
