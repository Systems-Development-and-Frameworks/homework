export default Vue.component('list', {
    props: ['todos'],
    template: `
        <div>
            <list-item 
                v-for="todo in todos"            
                v-bind:key="todo.id"
                v-bind:todo="todo">
            </list-item>
        </div>
   `
})