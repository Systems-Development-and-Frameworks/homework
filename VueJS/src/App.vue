<template>
  <div id="app">
    <list @listChanged="updateList($event)" v-bind:todos="this.todos"></list>
  </div>
</template>

<script>
import List from "./components/List.vue";

export default {
  name: "app",
  components: {
    List
  },
  data() {
    return {
      todos: [
        { id: "1", message: "Foo" },
        { id: "2", message: "Bar" },
        { id: "3", message: "Baz" }
      ]
    };
  },
  methods: {
    updateList(newList) {
      this.todos = newList;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
