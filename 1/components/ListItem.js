export default Vue.component('list-item', {
    props: ['item'],
    data() {
        return {
            isEditing: false,
            editText: '',
        };
    },
    methods: {
        toggleEditing() {
            this.isEditing = !this.isEditing;
            this.editText = this.item.message;
        },
        handleSave() {
            this.isEditing = false;
            this.$emit('input', {...this.item, message: this.editText});
        },
        handleDelete() {
            this.$emit('delete', this.item);
        },
    },
    computed: {},
    template:
        `<div class="list-item">
            {{item.id}}.
            <template v-if="isEditing">
                <input v-model="editText" />
            </template>
            <span v-else>{{item.message}}</span>
            <div class="list-item-buttons">
                <template v-if="isEditing">
                    <button @click="handleSave">Save</button>
                    <button @click="toggleEditing">Cancel</button>                       
                </template>
                <template v-else>
                    <button @click="toggleEditing">Edit</button>
                    <button @click="handleDelete">Delete</button>
                </template>
            </div>
        </div>`,
});
