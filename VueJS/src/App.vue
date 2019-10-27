<template>
  <div id="app">
    <Header />
    <TodoList
      v-bind:todoList="todoList"
      v-on:delete-todo="deleteTodo"
      v-on:change-text="changeText"
    />
    <AddTodo v-on:add-todo="addTodo" />
  </div>
</template>

<script>
import Header from "./components/layout/Header";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

export default {
  name: "app",
  components: {
    Header,
    TodoList,
    AddTodo
  },
  data() {
    return {
      todoList: [
        {
          id: 1,
          text: "Abrechnen",
          done: false
        },
        {
          id: 2,
          text: "Einkaufen",
          done: false
        },
        {
          id: 3,
          text: "Packen",
          done: false
        }
      ]
    };
  },
  methods: {
    deleteTodo(id) {
      this.todoList = this.todoList.filter(todo => todo.id !== id);
    },
    changeText(id, newText) {
      this.todoList.forEach(todo => {
        if (todo.id === id) {
          todo.text = newText;
        }
      });
    },
    addTodo(newTodo) {
      this.todoList.push(newTodo);
    }
  }
};
</script>

<style>
.button {
  flex: 2;
  border: none;
  background: #4caf50;
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
}

.button:hover {
  background: #43a047;
}
</style>
