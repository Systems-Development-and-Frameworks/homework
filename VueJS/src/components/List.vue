<template>
  <div>
    <h2>Todo List</h2>
    <ol>
      <list-item
        v-bind:key="item.id"
        v-for="item in this.todos"
        v-bind:id="item.id"
        v-bind:message="item.message"
        v-bind:onEdit="item.onEdit"
        @deleteListItem="deleteListItem($event)"
        @messageChanged="editListItem(item.id, $event)"
      ></list-item>
    </ol>
  </div>
</template>

<script>
import ListItem from "./ListItem.vue";

export default {
  name: "list",
  components: {
    ListItem
  },
  data() {
    return {
      todos: [
        { id: "1", message: "Foo" },
        { id: "2", message: "Bar" },
        { id: "3", message: "Baz" }
      ]
    };
  },
  methods: {
    editListItem(id, message) {
      this.todos.forEach(element => {
        if (element.id === id) {
          element.message = message;
        }
      });
    },
    deleteListItem(id) {
      this.todos = this.todos.filter(element => element.id != id);
    }
  }
};
</script>

<style scoped>
div {
  margin: 5% 0 0 10%;
}
</style>
