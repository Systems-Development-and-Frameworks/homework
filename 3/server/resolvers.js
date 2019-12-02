data = require('./data');

const resolvers = {
    Query: {
        todos: () => JSON.parse(JSON.stringify(data.todos))
    },
    Mutation: {
        addTodo: (parent, args) => {
            if(args.message != "" && args.message != null) {
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
        deleteTodo: (parent, args) => {
            if (args.id != null){
                let index = data.todos.findIndex(td => td.id === parseInt(args.id));
                if (index > 0){
                    data.todos.splice( index, 1)
                    return true
                }
                return false
            }
        },
        editTodo: (parent, args) => {
            if (args.id != null && args.message != null){
                if (data.todos.findIndex(td => td.id === parseInt(args.id)) > 0){
                    data.todos.find(td => td.id === parseInt(args.id)).message = args.message;
                    return data.todos.find(td => td.id === parseInt(args.id))
                }
                return
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