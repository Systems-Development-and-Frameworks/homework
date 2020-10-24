<template>
  <div>
    <div class="news-list-wrapper">
      <template v-if="items.length">
        <h1>News List</h1>
        <button @click="toggleAscendingOrder">
          Reverse order
        </button>
        <NewsItem v-for="item in orderedItmes" :key="item.id" :item="item" @update="update" @remove="remove" />
      </template>
      <p v-else>The list is empty :(</p>
    </div>
    <NewsForm :nextId="nextId" @create="create" />
  </div>
</template>

<script>
import NewsItem from '@/components/NewsItem/NewsItem.vue'
import NewsForm from '@/components/NewsForm/NewsForm.vue'

export default {
  components: {
    NewsItem,
    NewsForm,
  },
  props: {
    initialItems: { type: Array, default: () => [] }
  },
  data() {
    return {
      items: [...this.initialItems],
      ascending: false,
    }
  },
  computed: {
    orderedItmes() {
      if(this.ascending) return [...this.items].sort((a, b) => a.votes - b.votes)
      return [...this.items].sort((a, b) => b.votes - a.votes)
    },
    nextId() {
      return Math.max(...this.items.map(i => i.id), 0) + 1
    },
  },
  methods: {
    toggleAscendingOrder() {
      this.ascending = !this.ascending
    },
    remove(removedItem) {
      this.items = this.items.filter((item) => item.id !== removedItem.id)
    },
    update(updatedItem){
      this.items = this.items.map((item) => item.id === updatedItem.id ? updatedItem : item)
    },
    create(newItem) {
      this.items.push(newItem)
    }
  }
}
</script>

<style>
.news-list-wrapper {
  padding-bottom: 5em;
}
</style>
