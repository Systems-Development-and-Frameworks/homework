<template>
  <h1 v-if="loggedIn">Hello {{ currentUser.name }}</h1>
  <form v-else class="login-form" @submit.prevent="submit">
    <fieldset>
      <legend>
        Login (
        <span v-if="valid">valid</span>
        <span v-if="loading">loading</span>
        )
      </legend>
      <div>
        <label for="email">E-Mail:</label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          name="email"
          size="25"
        />
      </div>
      <div>
        <label for="name">Password:</label>
        <input
          id="password"
          v-model="formData.password"
          type="password"
          name="password"
          size="25"
        />
      </div>
      <div v-if="error" class="error">
        {{ error.message }}
      </div>
      <div>
        <button :disabled="loading || !valid" type="submit">Login</button>
      </div>
    </fieldset>
  </form>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { WRONG_CREDENTIALS } from '@/plugins/api'

export default {
  data() {
    return {
      error: null,
      formData: {
        email: '',
        password: '',
      },
    }
  },
  computed: {
    ...mapGetters('auth', ['loggedIn']),
    ...mapState('auth', ['loading', 'currentUser']),
    valid() {
      const { email, password } = this.formData
      return email && password
    },
  },
  methods: {
    ...mapActions('auth', ['login']),
    async submit() {
      try {
        const success = await this.login(this.formData)
        if (!success) this.error = { message: WRONG_CREDENTIALS }
      } catch (error) {
        this.error = { message: 'Oops! Something went wrong.' }
      }
    },
  },
}
</script>

<style>
.login-form fieldset {
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.login-form fieldset div {
  text-align: right;
}

.login-form fieldset div + div {
  margin-top: 2rem;
}

.error {
  color: red;
}
</style>
