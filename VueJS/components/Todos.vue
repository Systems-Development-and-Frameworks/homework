<template>
    <div>
        <div v-bind:key="todo.id" v-for="todo in todos">
            <TodoItem v-bind:todo="todo" v-on:del-todo="$emit('del-todo', todo.id)" v-on:edit-todo="editTodo"/>
        </div>
    </div>
</template>

<script>
    import TodoItem from './TodoItem.vue'

    export default {
        name: "Todos",
        components: {
            TodoItem
        },
        props: ["todos"],
        methods: {
            editTodo(id, newMessage){
                this.$emit('edit-todo', id, newMessage)
            }
        }
    }
</script>

<style scoped>

</style>