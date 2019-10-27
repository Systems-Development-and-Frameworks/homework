<template>
  <div>
    <form @submit="addTodo">
      <input type="text" v-model="todoText" name="text" placeholder="Add Todo..." />
      <input type="submit" value="Add" class="button" />
    </form>
  </div>
</template>

<script>
export default {
  name: "AddTodo",
  data() {
    return {
      todoText: "",
      currentId: 4
    };
  },
  methods: {
    addTodo(e) {
      e.preventDefault();
      if (this.todoText == "") {
        alert("You cannot give ToDos an empty name!");
        return;
      }
      const newTodo = {
        id: this.currentId++,
        text: this.todoText,
        done: false
      };
      //Send to parent
      this.$emit("add-todo", newTodo);

      this.todoText = "";
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  align-items: center;
  background: #a5d6a7;
}

input[type="text"] {
  flex: 10;
  margin-right: 5px;
  margin-left: 5px;
}
</style>