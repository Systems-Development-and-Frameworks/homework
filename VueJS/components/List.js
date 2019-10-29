export default Vue.component('list', {
    template: `<div>
		        <ul>
			        <list-item
			    	v-for="(item, index) in items"
			    	v-bind:item="item"
			    	v-on:save="$emit('save', {listIndex: index, message: $event})"
			    	v-on:remove="$emit('remove', index)"
			        />
		        </ul>
		        <button v-on:click="$emit('add')">Add new todo</button>
                </div>`,
    props:['items']
})
