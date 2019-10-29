<template>
  <div id="app">
    <list></list>
  </div>
</template>

<script>

import List from "./components/task1/List";

export default {
  name: 'app',
  components: {
    'list': List
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
