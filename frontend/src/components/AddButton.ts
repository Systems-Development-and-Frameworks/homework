import Vue from 'vue';

export default Vue.component('add-button', {
  methods: {
    handleSubmit() {
      this.$emit('submit', this.addText);
      this.toggleAdding();
    },
    toggleAdding() {
      this.isAdding = !this.isAdding;
      this.addText = '';
      this.$emit('toggle', this.isAdding);
    },
  },
  data() {
    return {
      isAdding: false,
      addText: '',
    };
  },
  template: `<div class="add-button">
                <button class="toggle" v-if="!isAdding" @click="toggleAdding">
                    <slot>Add</slot>
                </button>
                <template v-else>
                    <input v-model="addText" />
                    <button class="submit" @click="handleSubmit">Add</button>
                    <button class="cancel" @click="toggleAdding">Cancel</button>
                </template>
             </div>`,
});
