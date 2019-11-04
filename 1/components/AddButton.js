export default Vue.component('add-button', {
    methods: {
        handleSubmit() {
            this.isAdding = false;
            this.$emit('submit', this.addText);
        },
        toggleAdding() {
            this.isAdding = !this.isAdding;
            this.addText = '';
        },
    }
    ,
    data() {
        return {
            isAdding: false,
            addText: '',
        };
    },
    template:
        `<div class="add-button">
            <button v-if="!isAdding" @click="toggleAdding">
                <slot></slot>
            </button>
            <template v-else>
                <input v-model="addText" />
                <button @click="handleSubmit">Add</button>
                <button @click="toggleAdding">Cancel</button>
            </template>
        </div>`,
});
