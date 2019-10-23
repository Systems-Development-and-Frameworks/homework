<template>
<div>
  <ol id="grid">
    <listitem @deleteEntry="deleteEntry" @toggleEditMode="toggleEditMode" v-for="item in items" v-bind:entry="item" v-bind:key="item.id"></listitem>
  </ol>
  <!-- <input id=type="text"/> -->
  <button type="button" id="btnAdd" @click="$emit('toggleEditMode', entry.id)">Add</button>
  </div>
</template>

<script>
import listitem from "./listitem.vue";

export default {
  name: "list",
  props: {
    msg: String,
    items: Array
  },
  components: {
    listitem
  },
  methods: {
    deleteEntry: function(id) {
      this.$emit("deleteEntryb", id)
    },
    toggleEditMode: function(id) {
      this.$emit("toggleEditModeb", id)
    }
  }
};
</script>

<style scoped>
#grid {
  display: grid;
  /* grid-template-columns: 60px auto 80px; */
  /* grid-template-columns: 200px; */
  grid-row-gap: 20px;
  justify-items: start
}

#btnAdd {
  background-color: green;
  color: white;
  padding: 5px 20px 5px 20px;
}

</style>