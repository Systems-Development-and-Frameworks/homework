export const WRONG_CREDENTIALS = 'Wrong email/password combination'

export default (_context, inject) => {
  inject('api', {
    async login({ email, password }) {
      // fake API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (
        password !== '12341234' ||
        !['alice@example.org', 'bob@example.org'].includes(email)
      ) {
        throw new Error(WRONG_CREDENTIALS)
      }
      const [name] = email.split('@')
      return {
        token: `login_token_${email}_${password}`,
        user: { name },
      }
    },
  })
}
