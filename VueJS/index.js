
// import List from './components/List.js'
// import ListItem from './components/ListItem.js'

Vue.component('todo-list', {
	props: ['todo', 'index'],
	data: function() {
		return {
			setEdit: false,
			temp: ''
		}
	},
	template: `
				<li>
					<div v-if="!setEdit">
						{{ todo.message }}
						<button v-on:click="editing">Edit</button>
						<button v-on:click="deleting">Delete</button>
					</div>
					<div v-else>
						<input v-model="temp"/>
						<button v-on:click="saving">Save</button>
						<button v-on:click="canceling">Cancel</button>
					</div>
				</li>
	`,
	methods: {
		editing: function() {
			this.temp = this.todo.message;
			this.setEdit = true;
		},
		deleting: function() {
			this.setEdit = false;
			vue.delete(this.index);
		},
		saving: function() {
			this.setEdit = false;
			vue.save(this.temp, this.index);
		},
		canceling: function() {
			this.setEdit = false;
		}
	}
})

var vue = new Vue({
	el: '#app',
	data: {
		message: 'Hello Vue!',
		todos: [
		  { id: '1', message: 'Foo', },
		  { id: '2', message: 'Bar', },
		  { id: '3', message: 'Baz', }
		],
		nextID: '',
	},
	methods: {
		add: function () {
			this.todos.push({
				id: this.todos.length + 1,
				message: 'New ToDo'
			});
			this.todos.length + 1;
		},
		delete: function(index) {
			this.todos.splice(index, 1);
		},
		save: function(msg, index) {
			this.todos[index].message = msg;
		}
	},
	computed: {
        todos_length: function () {
			return this.todos.length;
        }
	},
	watch: {
        todos: {
            handler: function () {
				this.nextID = this.todos.length;
            },
            deep: true
        }
    }
})