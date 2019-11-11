<template>
    <div class="todo-item" v-bind:class="{'is-complete':todo.completed}">
        <p v-if="!isInEditMode">
            <input type="checkbox" v-on:change="markComplete">
            {{todo.message}}
            <button @click="isInEditMode=!isInEditMode" class="edit"> Edit</button>
            <button @click="$emit('del-todo', todo.id)" class="del"> X</button>
        </p>
        <p v-else>
            <input v-model="newMessage" placeholder="Edit todo">
            <button @click="editTodo(todo.id, newMessage)" class="edit">Save</button>
            <button @click="isInEditMode = !isInEditMode" class="edit">Cancel</button>
        </p>
    </div>
</template>

<script>
    export default {
        name: "TodoItem",
        props: ["todo"],
        data() {
            return {
                isInEditMode: false,
                newMessage: ""
            }
        }
        ,
        methods: {
            markComplete() {
                this.todo.completed = !this.todo.completed
            },
            editTodo(id, newMessage) {
                this.$emit('edit-todo', id, newMessage)
                this.isInEditMode = !this.isInEditMode
                this.newMessage = ""
            }
        }
    }
</script>

<style scoped>
    .todo-item {
        background: #f4f4f4;
        padding: 10px;
        border-bottom: 1px #ccc dotted;
    }

    .is-complete {
        text-decoration: line-through;
    }
    .edit {
        background: #555;
        color: #fff;
        border: none;
        padding: 5px 9px;
        border-radius: 50%;
        cursor: pointer;
    }

    .del {
        background: #ff0000;
        color: #fff;
        border: none;
        padding: 5px 9px;
        border-radius: 50%;
        cursor: pointer;
        float: right;
    }
</style>