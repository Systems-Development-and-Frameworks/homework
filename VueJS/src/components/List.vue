<template>
  <div>
    <h2>List</h2>
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

      // this.$emit("listChanged", this.changedTodos);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h3 {
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
} */
</style>
