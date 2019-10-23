Vue.component('todo-list', {
	template: `<div>
		<ul>
			<todo-item
				v-for="(todo, index) in todos"
				v-bind:todo="todo"
				v-on:save="$emit('save', {index: index, message: $event})"
				v-on:remove="$emit('remove', index)"
			/>\
		</ul>
		<button v-on:click="$emit('add')">Add new todo</button>
		</div>`,
	props: ['todos']
})

Vue.component('todo-item', {
  template: `<li>
	<template v-if="editing">
		{{ todo.id }} {{ todo.message }}
		<button v-on:click="editing=false">Edit</button>
	</template>
	<template v-else>
		<input placeholder="Type todo here..." v-model="input"/>
		<button v-on:click="save">Save</button>\
		<button v-on:click="editing=true">Cancel</button>
	</template>
	<button v-on:click="remove">Remove</button>
    </li>`,
  props: ['todo'],
  data: function() {
	return {
		editing: !(this.todo.message === ""),
		input: this.todo.message,
		identifier: this.todo.id
	}
  },
  methods: {
	save: function() {
		this.$emit('save', this.input);
		this.editing = true;
	},
	remove: function() {
		this.$emit('remove', this.identifier)
	}
  }
})

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
