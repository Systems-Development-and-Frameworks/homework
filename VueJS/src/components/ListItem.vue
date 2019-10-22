<template>
  <div>
    <span class="mR10">{{id}}.</span>
    <div class="mR10" v-if="onEdit">
      <input @input="changeMessage" :value="message" />
    </div>
    <div class="mR10" v-else>{{message}}</div>
    <div>
      <button @click="setEditMode(true)" v-if="!this.onEdit">Edit</button>
      <button @click="saveChanges()" v-if="this.onEdit">Done</button>
      <button @click="setEditMode(false)" v-if="this.onEdit">Cancel</button>
      <button @click="deleteListItem(id)">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "list-item",
  props: {
    id: String,
    message: String
  },
  data() {
    return {
      onEdit: false,
      newMsg: String
    };
  },
  methods: {
    setEditMode(value) {
      this.onEdit = value;
    },
    saveChanges() {
      this.setEditMode(false);
      this.$emit("messageChanged", this.newMsg);
    },
    changeMessage(event) {
      this.newMsg = event.target.value;
    },
    deleteListItem(id) {
      this.$emit("deleteListItem", id);
    }
  }
};
</script>

<style scoped>
.editSection {
  flex-direction: row;
  flex: 4;
}

.inputSection {
  flex: 2;
}

.itemContainer {
  flex-direction: row;
  flex: 1;
}

.idSection {
  flex: 1;
}

.mR10 {
  margin-right: 10px;
}

div {
  display: inline;
}
</style>