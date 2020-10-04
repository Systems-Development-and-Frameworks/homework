
# Exercise \#6

Start programming with NuxtJS and learn fullstack testing.

**Deadline is January 22th, 2020**

1. Create a NuxtJS app and write a couple of different page components. Your
   page component should have some level of nesting. Like `/nested.vue`,
   `/nested/index.vue` and `/nested/_id.vue`.
2. Connect your frontend with your backend via [apollo-module](https://github.com/nuxt-community/apollo-module).
   So if you update a data object in your frontend, it sends a graphql mutation
   to the backend.
3. Make use of apollo-module's [authentication helpers](https://github.com/nuxt-community/apollo-module#authentication).
4. Implement a page component which requires authentication. Make sure that your
   frontend returns a HTTP status code 403 if you are not allowed to see that
   page.
5. Request a review from @roschaefer.
6. Request a review from sb. else.

### How to get help

If you have troubles with the setup or dependencies, feel free to get in touch
with the open-source community: https://human-connection.org/discord
Most contributors know NuxtJS very well and can help with the setup.


### Optional exercises

1. Write frontend tests, mock `this.$apollo` and respond with some mocked data
   or simulate an error.
2. Write a fullstack test with https://www.cypress.io/.
3. Record and publish a pair-programming :heart_eyes:

If you copy code from other groups, please give credit to them in your commit
messages.
