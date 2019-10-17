export default Vue.component('todo-list', {
    props:['todos'],
    template: '<ol>' +
        '<li is="todo-item" ' +
        'v-for="(todo, index) in todos" ' +
        'v-bind:key="todo.id" ' +
        'v-bind:todo="todo" ' +
        'v-on:deleteTodo="todos.splice(index, 1)"' +
        '></li>' +
        '</ol>'
})
