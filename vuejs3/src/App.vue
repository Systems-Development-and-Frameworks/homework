<template>
  <div id="app">
    <h1>Frontend-Einkaufslisten-Bearbeitungs-Und-Erstellungsmaschine</h1>
    <List @delete-entry-b="deleteEntryb" @toggle-edit-mode-b="toggleEditModeb" @add-entry="addEntry" :items="items"/>
  </div>
</template>

<script>
import List from "./components/list.vue";
export default {
  name: "app",
  data: function() {
    return {
      items: [
        { id: 0, editMode: false, text: "Take out the trash" },
        { id: 1, editMode: false, text: "Get A+ in SDF" },
        { id: 2, editMode: false, text: "Trashtalk the vue 'Getting started' guide" },
        { id: 3, editMode: false, text: "git commit -m 'this'" }
      ],
        maxId: 4
    };
  },
  components: {
    List
  },
  methods: {
    deleteEntryb: function(id) {
      for (var i=0; i<this.items.length; i++) {
        if (this.items[i].id === id) {
          this.items.splice(i,1);
        }
      }
    },
    toggleEditModeb: function (id) {

      for (var i=0; i<this.items.length; i++) {
        if (this.items[i].id === id) {
          this.items[i].editMode = !this.items[i].editMode;
        }
      }
    },
      addEntry: function() {
        this.items.push({ id: this.maxId+1, editMode: true, text: "insert please..." });
        this.maxId++
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
