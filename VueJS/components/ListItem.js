export default Vue.component('todo-item', {
    //This component todo-item now accepts a prop
    //which is like a custom attribute, this prop
    //is called todo
    props: ['todo'],
    data: function() {
        return {
            isEdit: false,
            editedTodo: ''
        }
    },
    template:
        '<li v-if="!isEdit"> {{ todo.message }} ' +
        '<button @click="isEdit = !isEdit">Edit</button> ' +
        '<button @click="$emit(\'deleteTodo\')">Delete</button> ' +
        '</li>' +
        '<li v-else>' +
        '<input v-model="editedTodo" placeholder="Edit todo">' +
        '<button @click="editTodo(editedTodo)">Save</button> ' +
        '<button @click="isEdit = !isEdit">Cancel</button> ' +
        '</li>',
    methods: {
        editTodo(editedTodo) {
            this.isEdit = !this.isEdit,
            this.$emit('editTodo', editedTodo)
        }
    }
})
/*
'<button v-on:click="editTodo">Edit</button> ' +
*/
