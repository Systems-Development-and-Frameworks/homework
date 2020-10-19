<template>
  <form @submit.prevent="create">
    <input v-model.trim="formData.title">
    <button type="submit">
      Create
    </button>
  </form>
</template>

<script>
const initialFormData = { title: '' }

export default {
  props: {
    nextId: {
      type: Number, required: true,
    }
  },
  data(){
    return {
      formData: { ...initialFormData },
    }
  },
  methods: {
    create() {
      this.$emit('create', {
        ...this.formData,
        votes: 0,
        id: this.nextId,
      })
      this.formData = { ...initialFormData }
    }
  }
}
</script>
