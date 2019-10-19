<template>
  <div id="line">
    <button type="button" id="button">Edit</button>
    <li id="text">{{ entry.text }}</li>
    <button @click="$emit('deleteEntry', entry.indexId)" type="button">Delete</button>
  </div>
</template>

<script>
export default {
  name: "list",
  props: {
    entry: String,
    deleteentry: Function
  },
  data: function() {
    return { counter: 0 };
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