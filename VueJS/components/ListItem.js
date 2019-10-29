export default Vue.component('list-item', {

    template: `<li>
	            <template v-if="edit">
		            {{ item.id }} {{ item.message }}
		            <button v-on:click="edit=false">Edit</button>
	            </template>
	            <template v-else>
		            <input placeholder="Add Todo here" v-model="input"/>
		            <button v-on:click="save">Save</button>\
		            <button v-on:click="edit=true">Cancel</button>
	            </template>
	            <button v-on:click="remove">Remove</button>
            </li>`,
    data: function(){
        return{
            input: this.item.message,
            edit: !(this.item.message ===''),
            id: this.item.id
        }
    },
    methods:{
        save: function(){
            this.$emit('save', this.input);
            this.edit = true;
        },
        remove: function(){
            this.$emit('remove',this.id);
        }
    },
    props:['item']
})
