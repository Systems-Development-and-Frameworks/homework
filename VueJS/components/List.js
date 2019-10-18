export default Vue.component('todo-list', {
    props:['todos'],
    data: function() {
        return {
            msgTmp: ''
        }
    },
    template: '<ol>' +
        '<li is="todo-item" ' +
        'v-for="(todo, index) in todos" ' +
        'v-bind:key="todo.id" ' +
        'v-bind:todo="todo" ' +
        'v-on:deleteTodo="todos.splice(index, 1)"' +
        'v-on:editTodo="(editedTodo) => editTodo(editedTodo, todo)"' +
        'todo.message="msgTmp"' +
        '></li>' +
        '</ol>',
    methods: {
        editTodo(editedTodo, todo) {
            todo.message = editedTodo
        }
    }
})
