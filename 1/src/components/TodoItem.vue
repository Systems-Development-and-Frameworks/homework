<template>
    <div class="todo-item" v-bind:class="{'is-complete':todo.completed}">
        <div v-if="!isInEditMode">
            <input type="checkbox" v-on:change="markComplete">
            {{todo.message}}
            <button @click="isInEditMode=!isInEditMode" class="edit"> Edit</button>
            <button @click="$emit('del-todo', todo.id)" class="del"> X</button>
        </div>
        <div id="edit" v-else>
            <form @submit.prevent="editTodo(todo.id, newMessage)">
                <input type="text" v-model="newMessage" :placeholder="todo.message">
                <input type="submit" class="edit" value="Save" :disabled="!newMessage">
            </form>
            <button @click="isInEditMode = !isInEditMode" class="edit">Cancel</button>
        </div>
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
                this.completed = !this.completed
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

    #edit {
     display: flex;
    }
</style>