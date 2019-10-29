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
    removeItem(key) {
      this.todos.splice(this.todos.findIndex(x => x.id === key), 1);
    },
    addItem() {
      this.todos.push({
        id: (currentIndex++).toString(),
        message: "",
      });
    }
  }
})
