<template>
  <div>
    <input v-model="todoTextInput" placeholder="Add a To-Do" @keydown.enter="addTodo">
    <ul>
      <ToDoItem
        v-for="todo in todos" :key="todo.id"
        :todo="todo"
        @editTodo="editTodo"
      />
    </ul>
  </div>
</template>

<script>
  import ToDoItem from "./ToDoItem.vue";

  let idCounter = 0;
  let todos = [];

  //inital setup
  for(let i = 0; i < 10; i++){
    todos[i] = {
      id: idCounter,
      text: "Example of a note"
    }
    idCounter++;
  }

  export default {
    components: {
      ToDoItem,
    },
    data() {
      return {
        todoTextInput: "",
        todos,
      }
    },
    methods: {
      addTodo() {
        const newTodo = {
          id: idCounter,
          text: this.todoTextInput
        }
        idCounter++;
        this.todos = [newTodo, ...this.todos];
        console.log()
      },
      editTodo(todoId, todoText) {
        this.todos.filter(todo => {
          if (todo.id === todoId) {
            todo.text = todoText;
          }
        });
      }
    }
  }
</script>
