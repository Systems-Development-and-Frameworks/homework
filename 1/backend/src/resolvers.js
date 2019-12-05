const jwt = require('jsonwebtoken');
const fs = require('fs');
const { uuid } = require('uuidv4');

let data;

let SECRET_KEY = fs.readFileSync('./src/key/secret.key', 'utf8');

const resolvers = {
    Query: {
        todos: async (parent, args, context) => {
            // JSON.parse(JSON.stringify(data.todos))
            const { driver } = context
            const getTodoCypher = `
                    MATCH (todo)
                    RETURN todo.id, todo.message, todo.completed
                `

            const session = driver.session()
            try {
                data =  await session.run(getTodoCypher)
                const todos = await data.records.map(record => ({
                        id: record.get('todo.id'),
                        message: record.get('todo.message'),
                        completed: record.get('todo.completed')

                }))
                json_data = JSON.parse(JSON.stringify(todos))
                console.log(json_data)
                return json_data
            } finally {
                await session.close()
            }
        }
    },
    Mutation: {
        addTodo: async (parent, args, context) => {
            if(args.message != "" && args.message != null && context.token) {
                const { driver } = context
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
                data.todos.push(params);
                return params;
            }
            return;
        },
        deleteTodo: async (parent, args, context) => {
            if (args.id != null && context.token){
                const { driver } = context
                const deleteTodoCypher = `
                    MATCH (todo:Todo {id: $id})
                    DELETE todo
                `
                const session = driver.session()
                try {
                    await session.run(deleteTodoCypher, {id: args.id})
                } finally {
                    await session.close()
                }
                let index = data.todos.findIndex(td => td.id === args.id);
                if (index > 0){
                    data.todos.splice( index, 1)
                    return true
                }
                return false
            }
        },
        editTodo: async (parent, args, context) => {
            if (args.id != null && args.message != null && context.token){
                const { driver } = context
                const deleteTodoCypher = `
                    MATCH (todo:Todo {id: $id})
                    SET todo.message = $message
                `
                const session = driver.session()
                try {
                    await session.run(deleteTodoCypher, {id: args.id, message: args.message})
                } finally {
                    await session.close()
                }

                tod = data.todos.find(td => td.id === args.id)
                if (tod){
                    tod.message = args.message;
                    return tod;
                }
                return
            }

        },
        finishTodo: (parent, args, context) => {
            if (args.id != null && context.token){
                let tod = data.todos.find(td => td.id === parseInt(args.id));
                if (tod){
                    //Reverse status of item
                    tod.completed = !tod.completed;
                    return tod
                }
                return
            }
        },
        login: (parent, args) => {
            if (args.usr != null && args.pwd != null){
                let currentUsr = data.user.find(usr => usr.login === args.usr)
                if (currentUsr != null && currentUsr.password === args.pwd){
                    const token = jwt.sign(
                        { name: currentUsr.name, id: currentUsr.id },
                        SECRET_KEY,
                        { expiresIn: '1d' }
                    )
                    return token
                }
                return currentUsr.name
            }
        }
    }
};

function findNextId (){
    let lastId = 0;
    for (i = 0; i < data.todos.length; i++) {
        if (data.todos[i].id > lastId) {
            lastId = data.todos[i].id;
        }
    }
    lastId += 1;

    return lastId;
}

module.exports = resolvers;