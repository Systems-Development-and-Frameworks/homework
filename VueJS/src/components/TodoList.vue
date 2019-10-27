<template>
  <div>
    <div v-for="todo in todoList" v-bind:key="todo.id">
      <Todo v-bind:todo="todo" v-on:delete-todo="$emit('delete-todo', todo.id)" v-on:change-text="changeText"/>
    </div>
  </div>
</template>

<script>
import Todo from "./Todo";

export default {
  name: "TodoList",
  components: {
      Todo
  },
  methods: {
      changeText(id, text) {
          this.$emit('change-text', id, text);
      }
  },
  props: ["todoList"]
};
</script>

<style scoped>
</style>