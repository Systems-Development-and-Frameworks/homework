export default Vue.component('list', {
    props: ['todos'],
    template: `
        <div>
            <list-item 
                v-for="todo in todos"            
                :key="todo.id"
                :todo="todo"
                @update-todo="updateTodo"
                @delete-todo="deleteTodo">
            </list-item>
        </div>
   `,
    methods: {
        updateTodo: function(passedTodo) {
            this.$emit('update-todo', passedTodo)
            // console.log("(Eltern)\nHi todo[" + passedTodo.id + " | " + passedTodo.message + "], ich reiche dich mit $emit weiter")
        },  
        deleteTodo: function(id) {
            this.$emit('delete-todo', id)
            // console.log("(Eltern)\nIch will das todo mit der folgenden ID löschen: " + id)
        }
    }
})