<template>
  <div>
    <div class="container px-lg-5">
      <listitem
        @deleteEntry="deleteEntry"
        @toggleEditMode="toggleEditMode"
        v-for="item in items"
        v-bind:entry="item"
        v-bind:key="item.id"
      ></listitem>
    </div>
    <!-- <input id=type="text"/> -->
    <b-button class="btn btn-success" type="button" id="btnAdd" @click="$emit('toggleEditMode', entry.id)">Add</b-button>
  </div>
</template>

<script>
import listitem from "./listitemalt.vue";

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
      this.$emit("deleteEntryb", id);
    },
    toggleEditMode: function(id) {
      this.$emit("toggleEditModeb", id);
    }
  }
};
</script>

<style scoped>
</style>