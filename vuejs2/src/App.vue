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
        { indexId: 0, text: "Take out the trash" },
        { indexId: 1, text: "Get A+ in SDF" },
        { indexId: 2, text: "Trashtalk the vue 'Getting started' guide" },
        { indexId: 3, text: "git commit -m 'this'" }
      ]
    };
  },
  components: {
    List
  },
  methods: {
    deleteEntryb: function(indexId) {
      this.items.splice(indexId,1);
      for (var i=0; i<this.items.length; i++){
        if (this.items[i].indexId == indexId){
          this.items.pop(i)
          
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
