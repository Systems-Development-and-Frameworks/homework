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
      <div class="row mx-lg-n5">
        <div class="col-12 py-3 border bg-light">
      <b-button class="btn btn-success" type="button" @click="$emit('addEntry')" id="btnAdd">Add</b-button>
        </div>
      </div>
    </div>
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