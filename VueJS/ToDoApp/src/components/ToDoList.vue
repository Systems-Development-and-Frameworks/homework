<template>
  <div class="todoList">
    <div class="newTodo">
      <input v-model="todoTextInput" placeholder="Add a To-Do" @keydown.enter="addTodo">
      <b-button variant="success" @click="addTodo()" >Add new To-Do</b-button>
    </div>
      <b-list-group>
      <ToDoItem
        v-for="todo in todos" :key="todo.id"
        :todo="todo"
        @editTodo="editTodo"
        @removeTodo="removeTodo"
      />
    </b-list-group>
  </div>
</template>

<script>
  import { BButton, BListGroup } from 'bootstrap-vue'
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
      'b-button' : BButton,
      'b-list-group' : BListGroup
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
      },
      editTodo(todoId, todoText) {
        this.todos.filter(todo => {
          if (todo.id === todoId) {
            todo.text = todoText;
          }
        });
      },
      removeTodo(todoId) {
        this.todos = this.todos.filter(todo => {
          return todo.id !== todoId
        });
      }
    }
  }
</script>

<style>
  .todoList{
    margin: 10%
  }

  .newTodo{
    margin-bottom: 40px
  }
</style>
