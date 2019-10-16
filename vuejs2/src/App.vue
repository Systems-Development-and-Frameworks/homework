<template>
  <div id="app">
    <List v-bind:items="items"/>
  </div>
</template>

<script>
import List from "./components/list.vue";

export default {
  name: "app",
  data: function() {
    return {
      items: [
        { id: 0, text: "Take out the trash" },
        { id: 1, text: "Get A+ in SDF" },
        { id: 2, text: "Trashtalk the vue 'Getting started' guide" }
      ]
    };
  },

  components: {
    List
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
