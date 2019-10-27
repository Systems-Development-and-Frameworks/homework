<template>
  <li>
    <div class="itemContainer">
      <span class="messageSection">
        <span v-if="onEdit">
          <input @input="changeMessage" />
        </span>
        <span v-else>{{message}}</span>
      </span>

      <div class="mb5">
        <span class="buttonContainer" v-if="!this.onEdit">
          <a @click="setEditMode(true)">
            <img class="icon" src="../assets/edit_circ.png" />
          </a>
          <span class="space" />
          <a @click="deleteListItem(id)">
            <img class="icon" src="../assets/delete_circ.png" />
          </a>
        </span>
        <span class="buttonContainer" v-if="this.onEdit">
          <a @click="saveChanges()">
            <img class="icon" src="../assets/save_circ.png" />
          </a>
          <span class="space" />
          <a @click="setEditMode(false)">
            <img class="icon" src="../assets/cancel_circ.png" />
          </a>
        </span>
      </div>
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

.itemContainer {
  border-bottom-style: inset;
  margin-bottom: 20px;
  border-bottom-color: #42b983;
  display: flex;
  width: 30%;
}

.buttonContainer {
  display: flex;
}

.mb5 {
  margin-bottom: 5px;
}

.messageSection {
  display: flex;
  align-self: center;
  justify-self: center;
  margin-left: 15px;
  flex: 2;
}

.icon {
  width: 30px;
  height: 30px;
}

.space {
  margin-right: 20px;
}

a {
  display: flex;
  align-content: center;
}

input {
  color: #42b983;
}
</style>