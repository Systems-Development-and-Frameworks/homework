export default Vue.component('list', {
    props: ['value'],
    methods: {
        handleDelete(index) {
            this.value.splice(index, 1);
        },
        handleInput(newText, index) {
            const newItem = {...this.value[index], message: newText};
            this.value.splice(index, 1, newItem);
        },
        handleAdd(text) {
            const newId = this.value.length + 1;
            this.value.push({
                id: newId,
                message: text,
            });
        },
    },
    template: `<div class="list">` +
        `<add-button @submit="handleAdd">Add ToDo</add-button>` +
        `<list-item v-for="(item, index) in value" :key="'list-item-' + item.id" :item="item" @delete="handleDelete(index)" @input="handleInput($event, index)"></list-item>` +
        `</div>`,
});
