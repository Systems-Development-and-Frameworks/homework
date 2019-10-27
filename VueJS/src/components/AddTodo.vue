<template>
  <div>
    <form @submit="addTodo">
      <input type="text" v-model="todoText" name="text" placeholder="Add Todo..." />
      <input type="submit" value="Add" class="btn" />
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

<style>
</style>