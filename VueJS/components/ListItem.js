/**
 * List item component
 */
export default Vue.component('list-item', {
    props: ['id', 'message'],
    template:
        '<li>{{ message }}<button>Edit</button><button v-on:click="$emit(`remove-item`)">Delete</button></li>'
})
