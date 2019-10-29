/**
 * List item component
 */
export default Vue.component('list-item', {
    props: {
        id: String,
        message: String,
    },
    data: {
        oldMessage: String
    },
    created: function () {
        this.oldMessage = this.message
    },
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
        },
        setOldMessage() {
            this.oldMessage = this.message
        },
        resetMessage() {
            this.$emit('update:message', this.oldMessage)
        }
    },
    computed: {
        changeMessage: {
            get: function () {
                return this.message
            },
            set: function (value) {
                this.$emit('update:message', value)
            }
        }
    },
    template:
        '<li><span v-if="isHidden">{{ message }}</span>\
        <input v-model="changeMessage" v-if="!isHidden">\
        <button v-if="!isHidden" v-on:click="showEditForm()">Save</button>\
        <button v-if="!isHidden" v-on:click="showEditForm(), resetMessage()">Cancel</button>\
        <button v-if="isHidden" v-on:click="showEditForm(), setOldMessage()">Edit</button>\
        <button v-on:click="$emit(`remove-item`)">Delete</button></li>'
})
