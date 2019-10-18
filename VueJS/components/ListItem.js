export default Vue.component('list-item', {
    props: ['item'],
    data() {
        return {
            isEditing: false,
            editText: '',
        };
    },
    methods: {
        handleEdit() {
            this.isEditing = true;
            this.editText = this.item.message;
        },
        handleCancel() {
            this.isEditing = false;
        },
        handleSave() {
            this.isEditing = false;
            this.$emit('input', this.editText);
        },
        handleDelete() {
            this.$emit('delete');
        },
    },
    computed: {},
    template: `<div class="list-item">{{item.id}}. ` +
        `<template v-if="isEditing">` +
        `<input v-model="editText" />` +
        `</template>` +
        `<span v-else>{{item.message}}</span>` +
        `<div class="list-item-buttons">` +
        `<template v-if="isEditing">` +
        `<button @click="handleSave">Save</button>` +
        `<button @click="handleCancel">Cancel</button>` +
        `</template>` +
        `<button v-else @click="handleEdit">Edit</button>` +
        `<button @click="handleDelete">Delete</button>` +
        `</div>` +
        `</div>`,
});
