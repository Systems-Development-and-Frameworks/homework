import List from "./1/components/List.js"
import ListItem from "./1/components/ListItem.js"
new Vue({
    el: '#hello',
    data: {
        message: 'Hello Vue.js!'
    }
});

new Vue({
  el: '#app',
  data: {
	cId: -1,
    todos: [
      { id: '1', message: 'Foo', },
      { id: '2', message: 'Bar', },
      { id: '3', message: 'Baz', }
    ]
  },
  methods: {
    save: function (todo) {
		this.todos[todo.index].message = todo.message;
    },
	add: function() {
		this.todos.push({id: this.getId(), message: ''});
	},
	remove: function(index) {
		this.todos.splice(index, 1)
	},
	getId: function() {
		return this.cId++;
	}
  },
  created: function() {
	if(this.cId === -1) {
		this.cId = this.todos.length + 1;
	}
  }
})
