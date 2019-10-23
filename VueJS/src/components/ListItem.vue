<template>
  <li>
    <!-- <span class="mR10">{{id}}.</span> -->
    <div class="mR10" v-if="onEdit">
      <input @input="changeMessage" />
    </div>
    <div class="mR10" v-else>{{message}}</div>
    <div>
      <button @click="setEditMode(true)" v-if="!this.onEdit">Edit</button>
      <span v-if="this.onEdit">
        <button @click="saveChanges()">Save</button>
        <button @click="setEditMode(false)">Cancel</button>
      </span>
      <button v-if="!onEdit" @click="deleteListItem(id)">Delete</button>
    </div>
  </li>
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
      newMsg: ""
    };
  },
  methods: {
    setEditMode(value) {
      this.onEdit = value;
    },
    saveChanges() {
      this.setEditMode(false);

      if (this.newMsg.trim().length === 0) alert("Enter sth");
      else this.$emit("messageChanged", this.newMsg);
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