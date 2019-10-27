<template>
  <div class="todo" :class="backgroundClass">
    <div v-if="editing" class="row">
      <input v-if="todo.done" type="checkbox" v-on:change="todoDone" checked disabled />
      <input v-else type="checkbox" v-on:change="todoDone" disabled />
      <input class="main-content" v-model="newTodoText" :placeholder="todo.text" />
      <button @click="changeText()" class="button">Save</button>
      <button @click="editing = !editing" class="button">Cancel</button>
    </div>
    <div v-else class="row">
      <input v-if="todo.done" type="checkbox" v-on:change="todoDone" checked />
      <input v-else type="checkbox" v-on:change="todoDone" />
      <div class="main-content" v-bind:class="{'done-strikethrough':todo.done}">{{todo.text}}</div>
      <button @click="editing=!editing" class="button">Edit</button>
      <button @click="$emit('delete-todo', todo.id)" class="button">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Todo",
  data() {
    return {
      newTodoText: "",
      editing: false
    };
  },
  methods: {
    todoDone() {
      this.todo.done = !this.todo.done;
    },
    changeText() {
      if (this.newTodoText == "") {
        alert("You cannot give ToDos an empty name!");
        return;
      }
      this.$emit("change-text", this.todo.id, this.newTodoText);
      this.editing = !this.editing;
      this.newTodoText = "";
    }
  },
  props: ["todo"],
  computed: {
    backgroundClass() {
      if (this.editing) {
        return "edit-background";
      } else if (!this.todo.done && !this.editing) {
        return "default-background";
      } else {
        return "done-background";
      }
    }
  }
};
</script>

<style scoped>
.todo {
  border-bottom: 1px #444 dotted;
}

.default-background {
  background: #a5d6a7;
}

.edit-background {
  background: #66bb6a;
}

.done-background {
  background: #e8f5e9;
}

.done-strikethrough {
  text-decoration: line-through;
}

.main-content {
  flex: 10;
  margin-right: 5px;
}

.row {
  display: flex;
  align-items: center;
}
</style>