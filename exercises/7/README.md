# Exercise #7

| Deadline                   | Date                   |
| -------------------------- | ---------------------- |
| Review due date (optional) | 20.01.2021 - 14:00     |
| **Final Due date**         | **27.01.2021 - 14:00** |

## Goal

Extend exercise [#1](../1), [#2](../2), [#3](../3), [#4](../4), [#5](../5) and
[#6](../6) with the new [objectives](#objectives).

In this exercise, we will connect our Webapp with the backend. During that, we cover the following topics:
* [Isomorphic JavaScript](https://en.wikipedia.org/wiki/Isomorphic_JavaScript)
* [Client-Side-Rendering(CSR) vs. Server-Side-Rendering(SSR)](https://developers.google.com/web/updates/2019/02/rendering-on-the-web)
* [Vuex](https://vuex.vuejs.org/)
* [Vue-Apollo](https://apollo.vuejs.org/)
* [Progressive-Web-App](https://web.dev/progressive-web-apps/)

## Instructions

0. Discuss and decide your deployment target with your team:
   * Static (JAMstack) or
   * Server (Node.js)

1. Setup a Nuxt app that replaces your vue-cli `webapp/`.
   * Use [create-nuxt-app](https://nuxtjs.org/docs/2.x/get-started/installation#using-create-nuxt-app)
   for setup. Make sure to select 
      * "SSR/SSG" as Rendering mode
      * The deployment target you decided on in Instruction #0.
      * [@nuxtjs/pwa](https://pwa.nuxtjs.org/) for the progressive web app
   * Copy all relevant code (most importantly your components) from your old `webapp/` folder to your new one. 
   * Delete the old `webapp/` folder. Make sure the new one is in the same location.
   * Commit this refactoring in a *separate* PR and merge it into your `main` branch. This will keep the content of "Files Changed" tab
   small and help mentors to review your code.

2. Use [@nuxtjs/storybook](https://storybook.nuxtjs.org/) to
   setup storybook.

3. Use [@nuxtjs/apollo](https://github.com/nuxt-community/apollo-module) to
   setup [vue-apollo](https://github.com/vuejs/vue-apollo) in your Nuxt app. An
   alternative to `nuxtjs/apollo` is
   [nuxt-graphql-request](https://github.com/Gomah/nuxt-graphql-request). Both
   of these libraries have
   [authentication helpers](https://github.com/nuxt-community/apollo-module#authentication)
   or [similar features](https://github.com/Gomah/nuxt-graphql-request#authentication-via-http-header)
   to make sure that a valid JWT is sent on every authenticated request.

4. Create a `login.vue` page component and a `LoginForm.vue` component. The
   login form is responsible to call a `LOGIN` mutation and save the JWT token
   returned by the backend.

5. Create a menu component with a `<nuxt-link>` to `/login` if the user is
   not logged in. If the user is logged in, it shows a logout button. You might
   want to put this this menu component in your `layouts/default.vue`.
   Furthermore, you might want to use [Vuex](https://vuex.vuejs.org/) for a
   globally accessible `isAuthenticated` getter method. There is a [nuxt integration](https://nuxtjs.org/docs/2.x/directory-structure/store).

   * Hint: To initialize the store in full static mode, you could use a [plugin](https://nuxtjs.org/docs/2.x/directory-structure/plugins/):
   ```js
    export default function ({ app, store }) {
      const token = app.$apolloHelpers.getToken()
      store.commit('auth/setToken', token)
    }
   ```
   * Hint2: You might want to decode the id of the current user from the JWT with [jwt-decode](https://github.com/auth0/jwt-decode).

6. Make sure that your `upvote`, `delete` and `write` mutations hit
   your backend. If you use `vue-apollo`, it will update your cache
   automatically if you request the `ID` field in your mutations.

7. Your buttons should behave according to the authentication state. E.g. you
   could only display `upvote` when the user is logged in. Alternatively,
   you could redirect to `/login` if the user is not logged in. Also, show
   `delete` only for authors, same goes for `edit` (if you have such a button).

8. PR Review:
  * Review a pull request of another team.
    * Find at least 6 things (:star: from [Objectives](#objectives)) the other
    team did or didn't do.
    * Either "Request Changes" or "Approve" *do not just "Comment"*.
    * Suggest changes line-by-line in "Files Changed".
    * Link to your code review in the description of your own pull request.
  * Request a review from another team

## Objectives

:star: For instructions in the `README.md` on how to build your webapp for production.

:star: For no changes in "Files Changed" tab of the refactoring from `vue-cli` to `create-nuxt-app`. (See #1 in instructions)

:star: :star: For the API connection between your front- and backend.

:star: For your previous frontend tests still passing. Requests to the backend are mocked.

:star: :star: For a login feature in your webapp including a Vue component and its software tests.

:star: :star: For a menu component which shows a login or logout button and its software tests.

:star: For an upvote button that behaves according to the authentication state of your user

:star: For a delete button that is only visible to the author of the post.

:star: For [Lighthouse](https://developers.google.com/web/tools/lighthouse) reporting that your production website is installable as PWA (except HTTPS).

:star: For requesting a review and reviewing another team's PR.

All objectives must be implemented according to the [instructions](#instructions).

## Optional Objectives

:rocket: Create a storybook story for `LoginForm.vue`.

:rocket: Create storybook stories to show the appearance of the post component to the author and to another users.

:rocket: Use different [layouts](https://nuxtjs.org/docs/2.x/directory-structure/layouts). E.g. add a logout button in `layouts/default.vue`. Use a different layout for `pages/login.vue`.

:rocket: Add a [middleware](https://nuxtjs.org/docs/2.x/directory-structure/middleware) to redirect from `/login` to `/` when already logged in.

:rocket: Add [dynamic page components](https://nuxtjs.org/examples/routing-dynamic-pages/). E.g. every post gets a separate page component, e.g. `/post/_id.vue` or `/post/_slug.vue`.

:rocket: Navigating to a non-existing post route responds with a 404 HTTP status code.

:rocket: Your menu component shows the name of the current user when logged in. You could e.g. call a another grapqhl query to get the name of the user after a successful login. Alternatively, you could encode the name of the user in the JWT.

:rocket: The form to submit a new post has another text input for the URL of a link.

:rocket: The URL of the post appears on the post component or post page as an external link.

:rocket: On every post page you can see the list of voters. It's up to you if the result of the vote (up or down) is made public.
