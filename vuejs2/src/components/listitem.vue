<template>
  <li> {{ entry.text }} </li>
</template>

<script>
export default {
  name: "list",
  props: {
    entry: String
  }
};
</script>

<style scoped>
</style>