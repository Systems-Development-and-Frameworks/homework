<template>
  <div class="row mx-lg-n5">
    <div class="col-2 py-3 border bg-light">
      <b-button
        v-if="!entry.editMode"
        type="button"
        id="button"
        @click="$emit('toggleEditMode', entry.id)"
      >Edit</b-button>
      <b-button
        v-if="entry.editMode"
        type="button"
        id="buttonSave"
        @click="$emit('toggleEditMode', entry.id)"
        class="btn btn-success"
      >Save</b-button>
      <!-- <button v-bind:disabled="entry.visible" type="button" id="buttonSave" @click="save">Save</button> -->
    </div>
    <div class="col py-3 border bg-light">
      <form class="text">
        <p id="text" v-if="!entry.editMode">{{ entry.text }}</p>
        <input type="text" name="newText" v-model="entry.text" v-if="entry.editMode" />
      </form>
    </div>
    <div class="col-2 py-3 border bg-light">
      <b-button class="btn btn-danger" @click="$emit('deleteEntry', entry.id)" type="button">Delete</b-button>

    </div>
  </div>
</template>

<script>
export default {
  name: "list",
  props: {
    entry: Object,
    deleteentry: Function
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