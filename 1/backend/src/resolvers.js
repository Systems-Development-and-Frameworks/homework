const jwt = require('jsonwebtoken');
const fs = require('fs');

data = require('./data');

let SECRET_KEY = fs.readFileSync('./src/key/secret.key', 'utf8');

const resolvers = {
    Query: {
        todos: () => JSON.parse(JSON.stringify(data.todos))
    },
    Mutation: {
        addTodo: (parent, args, context) => {
            if(args.message != "" && args.message != null && context.token) {
                console.log("This works 2")
                let newTodo = {
                    id: findNextId(),
                    message: args.message,
                    completed: false,
                };
                data.todos.push(newTodo);
                return newTodo;
            }
            return;
        },
        deleteTodo: (parent, args, context) => {
            if (args.id != null && context.token){
                let index = data.todos.findIndex(td => td.id === parseInt(args.id));
                if (index > 0){
                    data.todos.splice( index, 1)
                    return true
                }
                return false
            }
        },
        editTodo: (parent, args, context) => {
            if (args.id != null && args.message != null && context.token){
                tod = data.todos.find(td => td.id === parseInt(args.id))
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