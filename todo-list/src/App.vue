<template>
  <div id="app">
    <list msg="js is shit" prop2="kuchen"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import List from './components/List.vue';

@Component({
  components: {
    List,
  },
})

export default class App extends Vue {}
</script>