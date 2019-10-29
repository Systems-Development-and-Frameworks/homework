<template>
  <div id="list-item">
    <div v-if="edit">
      <li>{{item.text}}
      <button v-on:click="setSavingMode">Edit</button>
      <button  @click="$emit('delete-item')">Delete</button>
      </li>
    </div>
    <div v-else>
      <li>
      <input id="new-item-text" v-model="item.text" />
      <button v-on:click="saveNewText">Save</button>
      <button v-on:click="cancelSavingMode">Cancel</button>
      </li>
    </div>
    
    
  </div>
</template>

<script>
export default {
  name: 'list-item',
  props: ['item'],
  data: function() {
    return {
      edit: true
    }
  },
  methods: {
    setSavingMode: function() {
      this.edit = false;
    },

    cancelSavingMode: function() {
      this.edit = true;
    },
    saveNewText: function() {
      this.item.text = document.getElementById("new-item-text").value;
      this.edit = true;
    }
  }
}
</script>

<style>
li {
  text-align: left;
}
</style>