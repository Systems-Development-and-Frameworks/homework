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
    /**
     * Sets the message value for resetting at cancel.
     */
    created: function () {
        this.oldMessage = this.message
    },
    data: function () {
        return {
            isHidden: true
        }
    },
    methods: {
        /**
         * Toggles the edit form.
         */
        showEditForm() {
            this.isHidden = !this.isHidden
        },
        /**
         * Sets the reset message value when user opens the form.
         */
        setOldMessage() {
            this.oldMessage = this.message
        },
        /**
         * Resets the message value to previously saved value.
         */
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
        <input v-model="changeMessage" v-if="!isHidden" max="40">\
        <button v-if="!isHidden" v-on:click="showEditForm()">Save</button>\
        <button v-if="!isHidden" v-on:click="showEditForm(), resetMessage()">Cancel</button>\
        <button v-if="isHidden" v-on:click="showEditForm(), setOldMessage()">Edit</button>\
        <button v-on:click="$emit(`remove-item`)">Delete</button></li>'
})
