<template>
  <ul>
    <ToDoItem
      v-for="todo in todos" :key="todo.id"
      :todo="todo"/>
  </ul>
</template>

<script>
  import ToDoItem from "./ToDoItem.vue";
  export default {
    components: {
      ToDoItem,
    },
    props: {
      todos: Array,
    }
  }
</script>
