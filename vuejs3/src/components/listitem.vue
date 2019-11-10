<template>
  <div class="row mx-lg-n5">
    <div class="col-2 py-3 border bg-light">
      <button
        v-if="!entry.editMode"
        type="button"
        name="edit-button"
        id="buttonEdit"
        @click="$emit('toggleEditMode', entry.id)"
        class="btn btn-primary"
      >Edit</button>
      <button
        v-if="entry.editMode"
        type="button"
        name="save-button"
        id="buttonSave"
        @click="$emit('toggleEditMode', entry.id)"
        class="btn btn-success"
      >Save</button>
      <!-- <button v-bind:disabled="entry.visible" type="button" id="buttonSave" @click="save">Save</button> -->
    </div>
    <div class="col py-3 border bg-light">
      <form class="text">
        <p id="text" v-if="!entry.editMode">{{ entry.text }}</p>
        <input type="text" name="newText" v-model="entry.text" v-if="entry.editMode" />
      </form>
    </div>
    <div class="col-2 py-3 border bg-light">
      <button
        type="button"
        name="delete-button"
        id="buttonDelete"
        @click="$emit('deleteEntry', entry.id)"
        class="btn btn-danger"
      >Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "listItem",
  props: {
    entry: Object,
    deleteEntry: Function
  },
  data: function() {
    return { counter: 0 };
  }
};
</script>

<style>
.text{
  text-align: left;
}
</style>
