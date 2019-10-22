<template>
  <div>
    <h2>List</h2>
    <div v-for=" item in this.todos" v-bind:key="item.id">
      <list-item
        v-bind:id="item.id"
        v-bind:message="item.message"
        v-bind:onEdit="item.onEdit"
        @deleteListItem="deleteListItem($event)"
        @messageChanged="editListItem(item.id, $event)"
      ></list-item>
    </div>
  </div>
</template>

<script>
import ListItem from "./ListItem.vue";
// import Todo from "../models/Todo.js";

export default {
  name: "list",
  props: {
    todos: Array
  },
  components: {
    ListItem
  },
  data() {
    return {
      changedTodos: Array
    };
  },
  methods: {
    editListItem(id, message) {
      this.changedTodos = this.todos;
      this.changedTodos.forEach(element => {
        if (element.id === id) {
          element.message = message;
        }
      });
    },
    deleteListItem(id) {
      // this.changedTodos = this.todos;
      this.changedTodos = this.todos.filter(element => element.id != id);

      this.$emit("listChanged", this.changedTodos);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
