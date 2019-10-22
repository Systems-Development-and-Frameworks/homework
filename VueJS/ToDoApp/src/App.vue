<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>Simple Todo App</h1>
    <ToDoList
    :todos="todos"/>
  </div>
</template>

<script>
  import ToDoList from "./components/ToDoList.vue";

  let todoExample = {
    text:"Note"
  }

  export default {
    components: {
      ToDoList,
    },
    data() {
      return {
        todos: [
          todoExample,
          todoExample,
          todoExample,
          todoExample
        ]
      }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1{
  font-weight: normal;
}
</style>
