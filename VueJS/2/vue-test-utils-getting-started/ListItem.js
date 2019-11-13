//todo_item
export default {
    template: `<li>
	<template v-if="editing">
		<p>{{ todo.id }} . {{ todo.message }}</p>
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
            editing: false,
            input: 'test',
            identifier: 1
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
}
