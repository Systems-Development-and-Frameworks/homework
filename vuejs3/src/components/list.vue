<template>
  <div>
    <div class="container px-lg-5">
      <listitem
        @deleteEntry="deleteEntry"
        @toggleEditMode="toggleEditMode"
        v-for="item in items"
        :entry="item"
        :key="item.id"
      ></listitem>
      <div class="row mx-lg-n5">
        <div class="col-12 py-3 border bg-light">
      <button class="btn btn-success" type="button" @click="$emit('addEntry')" id="btnAdd">Add</button>
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
    items: Array
  },
  components: {
    listitem
  },
  methods: {
    deleteEntry: function(id) {
      this.$emit("delete-entry-b", id);
    },
    toggleEditMode: function(id) {
      this.$emit("toggle-edit-mode-b", id);
    }
  }
};
</script>

<style scoped>
</style>
