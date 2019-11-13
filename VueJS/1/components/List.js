export default Vue.component('todos', {
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
