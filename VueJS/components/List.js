export default Vue.component('list', {
    props: ['value'],
    methods: {
        handleInput(newItem, oldItem) {
            const index = this.findIndex(oldItem);
            this.value.splice(index, 1, newItem);
        },
        handleDelete(item) {
            const index = this.findIndex(item);
            this.value.splice(index, 1);
        },
        handleAdd(text) {
            let highestId = 0;
            this.value.forEach(item => {
                console.log(item);
                if (item.id > highestId) {
                    highestId = item.id;
                }
            });

            this.value.push({
                id: +highestId + 1,
                message: text,
            });
        },
        findIndex(item) {
            const index = this.value.findIndex(localItem => {
                return localItem.id === item.id;
            });
            if (index < 0) {
                throw new Error(`Could not find item: '${JSON.stringify(item, undefined, 2)}'`);
            }
            return index;
        },
    },
    template:
        `<div class="list">
            <add-button @submit="handleAdd">Add ToDo</add-button>
            <list-item v-for="(item, index) in value" :key="item.id" :item="item" @input="handleInput($event, item)" @delete="handleDelete($event)"></list-item> 
        </div>`,
});
