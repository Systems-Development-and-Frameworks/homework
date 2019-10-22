<template>
  <ul>
    <ToDoItem
      v-for="todo in todos" :key="todo.id"
      :todo="todo"/>
  </ul>
</template>

<script>
  import ToDoItem from "./ToDoItem.vue";

  let todosExample = [];
  for(let i = 0; i < 10; i++){
    todosExample[i] = {
      id: i,
      text: "Example of a note"
    }
  }

  export default {
    components: {
      ToDoItem,
    },
    props: {
      todos: Array,
    }
  }
</script>
