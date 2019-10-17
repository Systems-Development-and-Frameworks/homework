export default Vue.component('todo-item', {
    //This component todo-item now accepts a prop
    //which is like a custom attribute, this prop
    //is called todo
    props: ['todo'],
    template: '<li> {{ todo.message }} ' +
        '<button v-on:click="$emit(\'deleteTodo\')">Delete</button> ' +
        '</li>'
})
/*
'<button v-on:click="editTodo">Edit</button> ' +
*/
