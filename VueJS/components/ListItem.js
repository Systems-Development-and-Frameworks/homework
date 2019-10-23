export default Vue.component('list-item', {
    props: ['todo'], 
    data: () => {
        return {
            editMode: false, 
            newMessage: ""
        }
    },
    template: `
        <form id="test">
            <li v-if="editMode == true" >                
                <input type="text" placeholder="enter new value" v-on:input="updateMessage"> 
                <button v-on:click="saveMe(todo)" type="button">
                    Save
                </button>
                <button v-on:click="cancelMe" type="button">
                    Cancel
                </button>
                <button v-on:click="deleteMe(todo)" type="button">
                    Delete
            </button>
            </li>
            <li v-else >                
                {{todo.id}}. {{todo.message}} 
                <button v-on:click="editMe" type="button">
                    Edit
                </button>
                <button v-on:click="deleteMe(todo)" type="button">
                    Delete
                </button>

            </li>
        </form> 
    `,
    methods: {
        editMe: function(event) {
            this.editMode = true;
        },
        
        saveMe: function(todo) {
            // console.log("(Kind)\nHallo todo[" + todo.id + " | " + todo.message + "]" 
            //             + "\". Dank v-on:input=\"updateMessage\" im imput-tag, wurdest hoffentlich geupdated!\n"
            //             + "Meine Eltern werden es nach der nächsten Zeile im Code dann bestimmt sehen.")
            this.todo.message = this.newMessage
            this.$emit('update-todo', todo)
            this.editMode = false
        },

        deleteMe: function(todo) {
            this.$emit('delete-todo', todo.id)
        },

        cancelMe: function(event) {
            this.editMode = false;
        }, 

        updateMessage: function(event) {
            this.newMessage = event.target.value
        }
    }
})
