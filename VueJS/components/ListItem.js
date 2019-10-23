export default Vue.component('list-item', {
    props: ['todo'], 
    data: () => {
        return {
            editMode: false,
        }

    },
    template: `
        <form id="test">
            <li v-if="editMode == true" >                
                <input v-model="todo.message"> 
                <button v-on:click="saveMe" type="button">
                    Save
                </button>
                <button v-on:click="cancelMe" type="button">
                    Cancel
                </button>
                <button v-on:click="deleteMe" type="button">
                    Delete
            </button>
            </li>
            <li v-else >                
                {{todo.id}}. {{todo.message}} 
                <button v-on:click="editMe" type="button">
                    Edit
                </button>
                <button v-on:click="deleteMe" type="button">
                    Delete
                </button>

            </li>
        </form> 
    `,
    methods: {
        editMe: function(event) {
            this.editMode = true;
        },
        
        saveMe: function(event) {
            alert('Hallo ' + this.todo.id + " soll gespeichert werden!")
        },

        deleteMe: function(event) {
            alert('Hallo ' + this.todo.id + " soll gelöscht werden!")
        },

        cancelMe: function(event) {
            this.editMode = false;
        } 
    }
})
