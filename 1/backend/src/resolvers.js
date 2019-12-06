const jwt = require('jsonwebtoken');
const fs = require('fs');
const {uuid} = require('uuidv4');

let data;

let SECRET_KEY = fs.readFileSync('./src/key/secret.key', 'utf8');

const resolvers = {
    Query: {
        todos: async (parent, args, context) => {
            // JSON.parse(JSON.stringify(data.todos))
            const {driver} = context
            const getTodoCypher = `
                    MATCH (todo:Todo)
                    RETURN todo.id, todo.message, todo.completed
                `

            const session = driver.session()
            try {
                data = await session.run(getTodoCypher)
                const todos = await data.records.map(record => ({
                    id: record.get('todo.id'),
                    message: record.get('todo.message'),
                    completed: record.get('todo.completed')

                }))
                json_data = JSON.parse(JSON.stringify(todos))
                return json_data
            } finally {
                await session.close()
            }
        }
    },
    Mutation: {
        addTodo: async (parent, args, context) => {
            if (args.message != "" && args.message != null && context.token) {
                const {driver} = context
                const createTodoCypher = `
                    CREATE (todo:Todo {params})
                    RETURN todo
                `
                const params = {
                    message: args.message,
                    completed: false,
                    id: uuid()
                }
                const session = driver.session()
                try {
                    await session.run(createTodoCypher, {params})
                } finally {
                    await session.close()
                }
                return params;
            }
            return;
        },
        deleteTodo: async (parent, args, context) => {
            if (args.id != null && context.token) {
                const {driver} = context
                const deleteTodoCypher = `
                    MATCH (todo:Todo {id: $id})
                    DELETE todo
                `
                const session = driver.session()
                try {
                    await session.run(deleteTodoCypher, {id: args.id})
                    return true
                } finally {
                    await session.close()
                }
                return false
            }
        },
        editTodo: async (parent, args, context) => {
            if (args.id != null && args.message != null && context.token) {
                const {driver} = context
                const editTodoCypher = `
                    MATCH (todo:Todo {id: $id})
                    SET todo.message = $message
                    RETURN todo.id, todo.message, todo.completed
                `
                const session = driver.session()
                try {
                    const _response = await session.run(editTodoCypher, {id: args.id, message: args.message})
                    const [response] = await _response.records.map(record => ({
                        id: record.get('todo.id'),
                        message: record.get('todo.message'),
                        completed: record.get('todo.completed')
                    }))
                    if (response) {
                        return response

                    }
                return null
                } finally {
                    await session.close()
                }
            }

        },
        finishTodo: async (parent, args, context) => {
            if (args.id != null && context.token) {
                const {driver} = context
                const finishTodoCypher = `
                MATCH (todo:Todo{id: $id})
                SET todo.completed = True
                RETURN todo.id, todo.message, todo.completed
                `
                const session = driver.session()
                try {
                    const _response = await session.run(finishTodoCypher, {id: args.id})
                    const [response] = await _response.records.map(record => ({
                        id: record.get('todo.id'),
                        message: record.get('todo.message'),
                        completed: record.get('todo.completed')
                    }))
                    if (response) {
                        return response

                    }
                    return null
                } finally {
                    await session.close()
                }
            }
        },
        login: async (parent, args, context) => {
            if (args.usr != null && args.pwd != null) {
                let user
                const {driver} = context
                const getUserCypher = `
                MATCH (user:User {login: $login, password: $password})
                RETURN user.login, user.password
                `
                const session = driver.session()
                try {
                    user = await session.run(getUserCypher, {login: args.usr, password: args.pwd})

                } finally {
                    await session.close()
                }

                const [currentUsr] = await user.records.map(record => ({
                    login: record.get('user.login'),
                    password: record.get('user.password')

                }))

                if (currentUsr.login === args.usr && currentUsr.password === args.pwd) {
                    const token = jwt.sign(
                        {name: currentUsr.name, id: currentUsr.id},
                        SECRET_KEY,
                        {expiresIn: '1d'}
                    )
                    return token
                }
                return currentUsr.name
            }
        }
    }
};

module.exports = resolvers;