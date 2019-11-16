import { TodoItem } from 'core';
import Vue from 'vue';

export default Vue.component('list', {
  props: ['todos'],
  computed: {
    nextId() {
      return Math.max(
        ...this.todos.map((todo: TodoItem) => {
          return +todo.id;
        }),
      );
    },
  },
  methods: {
    handleInput(newItem: TodoItem, oldItem: TodoItem) {
      const index = this.findIndex(oldItem);
      this.todos.splice(index, 1, newItem);
    },
    handleDelete(item: TodoItem) {
      const index = this.findIndex(item);
      this.todos.splice(index, 1);
    },
    handleAdd(text: string) {
      const item: TodoItem = {
        id: (this.nextId + 1).toString(),
        description: text,
        isDone: false,
        createdAt: new Date().toISOString(),
      };
      this.todos.push(item);
    },
    findIndex(item: TodoItem) {
      const index = this.todos.findIndex((localItem: TodoItem) => {
        return localItem.id === item.id;
      });
      if (index < 0) {
        throw new Error(`Could not find item: '${JSON.stringify(item, undefined, 2)}'`);
      }
      return index;
    },
  },
  template: `<div class="list">
                <add-button @submit="handleAdd">Add ToDo</add-button>
                <p v-if="todos.length === 0">Currently, there are no items.</p>
                <div class="list-items" v-else>
                    <list-item v-for="(item, index) in todos" :key="item.id" :item="item" @input="handleInput($event, item)" @delete="handleDelete($event)"></list-item>
                </div>
             </div>`,
});
