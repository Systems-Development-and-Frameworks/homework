import List from './components/List.js'
import ListItem from './components/ListItem.js'

new Vue({
  el: '#app',
  data: {
    todos: [
      { id: '1', message: 'Foo', },
      { id: '2', message: 'Bar', },
      { id: '3', message: 'Baz', }
    ],
    currentIndex: 3,       // key for new todo item
  },
  methods: {
    /**
     * Removes an item from the todo list.
     * @param {*} key Key of that item.
     */
    removeItem(key) {
      this.todos.splice(this.todos.findIndex(x => x.id === key), 1);
    },
    /**
     * Adds a new item to the list.
     * The id preincrements from the starting index 3, the message is 'New Item <index>'.
     */
    addItem() {
      this.todos.push({
        id: (++this.currentIndex).toString(),
        message: `New Item ${this.currentIndex}`,
      });
    }
  }
})
