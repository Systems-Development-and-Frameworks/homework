<template>
  <div id="app">
    <Header></Header>
    <AddTodo v-on:addTodo="addTodo"></AddTodo>
    <Todos v-bind:todos="todos" v-on:del-todo="deleteTodo" v-on:edit-todo="editTodo"/>
  </div>
</template>

<script>
import Todos from './components/Todos'
import AddTodo from './components/AddTodo'
import Header from './components/layout/Header'


export default {
  name: 'app',
  components: {
    Header,
    Todos,
    AddTodo
  },
  data() {
    return {
      todos: [
        { id: '1', message: 'Einkaufen', completed: false},
        { id: '2', message: 'Aufräumen', completed: false},
        { id: '3', message: 'Putzen', completed: false}
      ],
      nextTodoId: 4
    }
  },
  methods: {
    addTodo(newTodo) {
      newTodo.id = this.nextTodoId++
      this.todos.push(newTodo)
    },
    editTodo(id, newMessage) {
      this.todos.filter(todo => {
        if(todo.id == id) {
          todo.message = newMessage
        }
      })
    },
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id != id)
    }
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4;
  }
  .btn {
    display: inline-block;
    border: none;
    background: #555;
    color: #fff;
    padding: 7px 20px;
    cursor: pointer;
  }
  .btn:hover {
    background: #666;
  }
</style>
