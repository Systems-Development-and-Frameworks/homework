<template>
  <div id="app">
    <List @deleteEntryb="deleteEntryb" v-bind:items="items"/>
  </div>
</template>

<script>
import List from "./components/list.vue";

export default {
  name: "app",
  data: function() {
    return {
      items: [
        { id: 0, visible: true, text: "Take out the trash" },
        { id: 1, visible: true, text: "Get A+ in SDF" },
        { id: 2, visible: true, text: "Trashtalk the vue 'Getting started' guide" },
        { id: 3, visible: true, text: "git commit -m 'this'" }
      ]
    };
  },
  components: {
    List
  },
  methods: {
    deleteEntryb: function(id) {
      
      for (var i=0; i<this.items.length; i++){
        if (this.items[i].id == id){
          this.items.splice(i,1);
        }
      }
    }
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
