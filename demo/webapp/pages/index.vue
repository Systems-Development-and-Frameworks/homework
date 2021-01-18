<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
export default {
  components: {
    LoginForm,
  },
  asyncData() {
    return {
      title: 'Hello',
    }
  },
  data() {
    return {
      title: null,
    }
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
