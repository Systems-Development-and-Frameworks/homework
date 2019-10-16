<template>
  <ol>
    <listitem v-for="item in items" v-bind:entry="item" v-bind:key="item.id"></listitem>
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
  }
};
</script>

<style scoped>
</style>