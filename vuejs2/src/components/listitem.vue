<template>
  <div id="line">
    <div>
      <button type="button" id="button" @click="$emit('edit', entry.id)">Edit</button>
      <button v-if="entry.editMode" type="button" id="buttonSave" @click="save">Save</button>
      <!-- <button v-bind:disabled="entry.visible" type="button" id="buttonSave" @click="save">Save</button> -->
    </div>
    
    <form id="text">
      <li id="text" v-if="!entry.editMode">{{ entry.text }} | {{entry.editMode}}</li>
      <input type="text" name="fname" :value="entry.text" v-if="entry.editMode"/>
    </form>
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
    edit: function() {
      this.entry.visible = !this.entry.visible;
      alert(this.entry.visible)
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