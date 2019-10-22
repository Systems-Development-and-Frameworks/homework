<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>Simple Todo App</h1>
    <ToDoItem
      :text="text"/>
  </div>
</template>

<script>
  import ToDoItem from "./components/ToDoItem.vue";
  export default {
    components: {
      ToDoItem,
    },
    data() {
      return {
        text: "Note"
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
