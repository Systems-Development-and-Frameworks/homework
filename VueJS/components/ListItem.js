export default Vue.component('list-item', {
    props: ['todo'],
    template: `
        <form id="test">
            <li>                
                <input v-model="todo.message"> 
                <button v-on:click="saveMe">
                    Save
                </button>
                <button v-on:click="cancelMe">
                    Cancel
                </button>
                <button v-on:click="deleteMe">
                    Delete
            </button>
            </li>
        </form>        
    `,
    methods: {
        editMe: function(event) {
            alert('Hallo ' + this.todo.id + " soll editiert werden!")
        },
        
        saveMe: function(event) {
            alert('Hallo ' + this.todo.id + " soll gespeichert werden!")
        },

        deleteMe: function(event) {
            alert('Hallo ' + this.todo.id + " soll gelöscht werden!")
        }, 
        cancelMe: function(event) {
            alert('Hallo ' + this.todo.id + " soll gelöscht werden!")
        } 
    }
})
            // <button v-on:click="count++">
            //     You clicked me {{ count }} times.
            // </button>