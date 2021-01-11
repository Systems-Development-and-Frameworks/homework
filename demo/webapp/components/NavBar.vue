<template>
  <nav class="nav-bar">
    <div>
      <nuxt-link to="#">Some</nuxt-link>
      <nuxt-link to="#">Menu</nuxt-link>
      <nuxt-link to="#">Item</nuxt-link>
    </div>
    <div>
      <template v-if="loggedIn">
        <button @click="logout">Logout</button>
      </template>
      <template v-else> You are not logged in. </template>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('auth', ['loggedIn']),
  },
  methods: {
    ...mapActions('auth', ['logout']),
  },
}
</script>

<style>
.nav-bar {
  top: 0;
  position: fixed;
  width: 100%;
  height: 6rem;
  padding: 2rem;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
}
</style>
