<template>
  <div id="app">
    <NewsList :initialItems="items"/>
  </div>
</template>

<script>
import NewsList from './components/NewsList.vue'

export default {
  name: 'App',
  components: {
    NewsList,
  },
  data() {
    return {
      items: [
        { id: 1, votes: 0, title: 'VueJS' },
        { id: 2, votes: 0, title: 'is' },
        { id: 3, votes: 0, title: 'nice!' },
      ]
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
