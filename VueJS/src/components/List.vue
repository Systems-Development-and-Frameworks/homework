<template>
  <div>
    <h2>Todo List</h2>
		<AddListItem
			v-model="newItemText"
			@keydown.enter="addItem"
      @click="addItem"
		/>
    <ol v-if="todos.length">
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
    <p v-else>
			Nothing left in the list. Add a new todo in the input above.
		</p>
  </div>
</template>

<script>
import ListItem from "./ListItem.vue";
import AddListItem from './AddListItem.vue'


let nextItemId = 1

export default {
  name: "list",
  components: {
    ListItem,
    AddListItem
  },
  data() {
    return {
      newItemText: '',
      todos: [
        {id: nextItemId++, message: "Foo" },
        {id: nextItemId++, message: "Bar" },
        {id: nextItemId++, message: "Baz" }
      ]
    };
  },
  methods: {
      addItem() {
      const trimmedText = this.newItemText.trim();
      if (trimmedText) {
        this.todos.push({
          id: nextItemId++,
          message: trimmedText
        });
        this.newItemText = "";
      }
    },
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
