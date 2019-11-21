# Exercise \#3

Test-drive the development of a GraphQL server.

**Deadline is December 4th, 2019**

### tl;dr

1. Show that you can can setup an [apollo-server](https://www.apollographql.com/docs/apollo-server/).
2. Test your backend with [apollo-server-testing](https://www.apollographql.com/docs/apollo-server/testing/testing/).
3. Implement [JWT](https://jwt.io/) and have at least one query which requires authentication.
4. Add backend testing to your build server pipeline.
5. Request a review from @roschaefer
6. Request a review from sb. else

Note that it is **not required** that you connect your frontend with your
backend.


### Suggested workflow and some inspiration

* Test-drive your implementation. As a first step, you can just write down the
  documentation, e.g.
   ```js
   it.todo("behaves in a specified way")
   ```
   will create a to-be-implemented test case with this description.
* Pro tip: I run queries and mutations against an apollo server and check the
  response with jest's [`toMatchObject`](https://jestjs.io/docs/en/expect#tomatchobjectobject)
  matcher all the time. You can use it to check for both `data` and `errors`.
* Have a look into the [Human Connection](https://github.com/human-connection/human-connection)
  repo to learn how we implement JWT and write backend tests.
* Be creative with your type definitions in your schema and have some custom
  types. You could e.g. implement CRUD operations for your types. 
* If you want to connect your frontend with your backend (totally optional) it
  would be wise if one of your types is a `Todo`.
* Here is some inspiration: ![Test cases for CRUD operations](./crud.png)


### Optional (will be part of an upcoming exercise)
* Implement a permission layer around your app. Use [graphql-shield](https://github.com/maticzav/graphql-shield)
  and [graphql-middleware](https://github.com/prisma-labs/graphql-middleware).
* Here is some inspiration how your test cases could look like:
  ![Test cases for a permission layer](./permissions.png)
* Connect your frontend with your backend via [vue-apollo](https://github.com/vuejs/vue-apollo).
  So if you update a todo in your frontend, it sends a graphql mutation to the
  backend.


If you copy code from other groups, please give credit to them in your commit
messages.
