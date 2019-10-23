<template>
  <div id="app">
    <List @deleteEntryb="deleteEntryb" @toggleEditModeb="toggleEditModeb" v-bind:items="items"/>
  </div>
</template>

<script>
import List from "./components/listalt.vue";
export default {
  name: "app",
  data: function() {
    return {
      items: [
        { id: 0, editMode: false, text: "Take out the trash" },
        { id: 1, editMode: false, text: "Get A+ in SDF" },
        { id: 2, editMode: false, text: "Trashtalk the vue 'Getting started' guide" },
        { id: 3, editMode: false, text: "git commit -m 'this'" }
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
    },
    toggleEditModeb: function (id){

      for (var i=0; i<this.items.length; i++){
        if (this.items[i].id == id){
          this.items[i].editMode = !this.items[i].editMode;
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
/* 
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
} */
</style>
