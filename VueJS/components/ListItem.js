/**
 * List item component
 */
export default Vue.component('list-item', {
    props: ['id', 'message'],
    data: function () {
        return {
            isHidden: true
        }
    },
    methods: {
        showEditForm() {
            console.log('clicked')
            console.log(`${this.isHidden}`)
            this.isHidden = !this.isHidden
        }
    },
    template:
        '<li>{{ message }}\
        <input v-if="!isHidden" v-model="message">\
        <button v-if="isHidden" v-on:click="$emit(`save-changes`)">Save</button>\
        <button v-if="isHidden>Cancel</button>\
        <button v-on:click="showEditForm()">Edit</button>\
        <button v-on:click="$emit(`remove-item`)">Delete</button></li>'
})
