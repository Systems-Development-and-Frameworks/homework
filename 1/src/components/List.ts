import Vue from 'vue';

import { TodoItem } from '../index';

export default Vue.component('list', {
  props: ['value'],
  methods: {
    handleInput(newItem: TodoItem, oldItem: TodoItem) {
      const index = this.findIndex(oldItem);
      this.value.splice(index, 1, newItem);
    },
    handleDelete(item: TodoItem) {
      const index = this.findIndex(item);
      this.value.splice(index, 1);
    },
    handleAdd(text: string) {
      let highestId = 0;
      this.value.forEach((item: TodoItem) => {
        if (+item.id > highestId) {
          highestId = +item.id;
        }
      });

      this.value.push({
        id: (highestId + 1).toString(),
        message: text,
      });
    },
    findIndex(item: TodoItem) {
      const index = this.value.findIndex((localItem: TodoItem) => {
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
                <p v-if="value.length === 0">Currently, there are no items.</p>
                <div class="list-items" v-else>
                    <list-item v-for="(item, index) in value" :key="item.id" :item="item" @input="handleInput($event, item)" @delete="handleDelete($event)"></list-item>
                </div>
             </div>`,
});
