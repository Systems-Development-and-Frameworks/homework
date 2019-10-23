export default Vue.component('list-item', {
    props: ['content'],
    data: () => {
        return {
            count: 0
        }
    },
    template: `
        <li> 
            {{content.id}}. {{content.message}}
            <button v-on:click="edit">
                Edit
            </button> 
            <button v-on:click="count++">
                Delete.
            </button>

        </li>'
    `,
    methods: {
        edit: function(event) {
            alert('Hallo ' + this.content.id + "!")
        } 
    }
})
            // <button v-on:click="count++">
            //     You clicked me {{ count }} times.
            // </button>