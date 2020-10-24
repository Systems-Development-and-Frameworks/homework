<template>
  <div>
    <h2> {{ item.title }} ({{ item.votes }}) </h2>
    <button @click="upvote" >
      Upvote
    </button>
    <button @click="downvote" >
      Downvote
    </button>
    <button @click="remove" >
      Remove
    </button>
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object, required: true }
  },
  methods: {
    upvote(){
      this.$emit('update', {
        ...this.item,
        votes: (this.item.votes + 1)
      })
    },
    downvote(){
      this.$emit('update', {
        ...this.item,
        votes: (this.item.votes - 1)
      })
    },
    remove(){
      this.$emit('remove', this.item)
    }
  }
}
</script>
