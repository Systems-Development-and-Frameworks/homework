<template>
  <div>
    <div class="news-list-wrapper">
      <h1>News List</h1>
      <NewsItem v-for="item in orderedItmes" :key="item.id" :item="item" @update="update" @remove="remove" />
    </div>
    <NewsForm :nextId="nextId" @create="create" />
  </div>
</template>

<script>
import NewsItem from './NewsItem.vue'
import NewsForm from './NewsForm.vue'
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
      items: [...this.initialItems]
    }
  },
  computed: {
    orderedItmes() {
      return [...this.items].sort((a, b) => b.votes - a.votes)
    },
    nextId() {
      return Math.max(...this.items.map(i => i.id), 0) + 1
    },
  },
  methods: {
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
  padding: 5em 0;
}
</style>
