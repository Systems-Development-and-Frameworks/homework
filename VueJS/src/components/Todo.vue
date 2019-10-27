<template>
    <div>
        <p v-if="editing">
            <input v-model="newTodoText" :placeholder="todo.text">
            <button @click="changeText()">Save</button>
            <button @click="editing = !editing">Cancel</button>
        </p>
        <p v-else>
            <input v-if="todo.done" type="checkbox" v-on:change="todoDone" checked>
            <input v-else type="checkbox" v-on:change="todoDone">
            {{todo.text}}
            <button @click="editing=!editing">Edit</button>
            <button @click="$emit('delete-todo', todo.id)">Delete</button>
        </p>
    </div>
</template>

<script>
export default {
    name: "Todo",
    data() {
        return {
            newTodoText: "",
            editing: false
        }
    },
    methods: {
        todoDone() {
            this.todo.done = !this.todo.done;
        },
        changeText() {
            this.$emit("change-text", this.todo.id, this.newTodoText);
            this.editing = !this.editing;
            this.newTodoText = "";
        }
    },
    props: ["todo"]
}
</script>

<style>

</style>