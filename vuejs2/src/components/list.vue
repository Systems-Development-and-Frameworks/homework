<template>
  <ol id="grid">
    <listitem @deleteEntry="deleteEntry" @edit="enableEditMode" v-for="item in items" v-bind:entry="item" v-bind:key="item.id"></listitem>
  </ol>
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
    enableEditMode: function(id) {
      this.$emit("enableEditModeb", id)
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

</style>