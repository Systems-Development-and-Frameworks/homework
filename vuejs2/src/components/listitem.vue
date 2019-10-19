<template>
  <div id="line">
    <div>
      <button type="button" id="button" @click="edit">Edit</button>
      <button v-bind:disabled="entry.visible" type="button" id="buttonSave" @click="save">Save</button>
    </div>
    <li id="text">{{ entry.text }} | {{entry.visible}} </li>
    <button @click="$emit('deleteEntry', entry.id)" type="button">Delete</button>
  </div>
</template>

<script>
export default {
  name: "list",
  props: {
    entry: Object,
    deleteentry: Function
  },
  data: function() {
    return { counter: 0 };
  },
  methods: {
    edit: function(){
      alert("test")
      this.entry.visible = false
    }
  }
};
</script>

<style>
#line {
  display: grid;
  grid-template-columns: 60px 450px 80px;
  grid-gap: 40px;
}

#text {
  text-align: left;
}
</style>