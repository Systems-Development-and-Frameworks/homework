# Exercise #3

| Deadline                   | Date                   |
| -------------------------- | ---------------------- |
| Review due date (optional) | 18.11.2020 - 14:00     |
| **Final Due date**         | **25.11.2020 - 14:00** |

## Goal

You will learn the concepts of [GraphQL](https://graphql.org/), how to setup your own resolvers with apollo-server and how to do test-driven development (TDD) with [apollo-server-testing](https://www.apollographql.com/docs/apollo-server/testing/testing/).

Because `News` is [uncountable in English](https://www.espressoenglish.net/is-news-singular-or-plural/#:~:text=The%20word%20%E2%80%9Cnews%E2%80%9D%20in%20English,never%20use%20a%20or%20an.) we're going
to use the term `Post` for the entity which has a `title` and `votes`.

Extend exercise [#1](../1) and [#2](../2) with the new [objectives](#objectives).

## Instructions

1. Add a `backend` folder in your root directory. If necessary, restructure your project so `webapp` is also in your root directory. Make sure moved files/folders show as 'renamed' rather than removed and created to contain the files history. In the end, you want a structure similar to this:

```console
$ ls
archive/  backend/  exercises/  webapp/  README.md
```

2. [Setup your graphql backend with apollo-server](https://www.apollographql.com/docs/apollo-server/getting-started/) in your `backend` folder. Setup a linter. You can use `npx eslint --init` to setup eslint.

3. Setup [apollo-server-testing](https://www.apollographql.com/docs/apollo-server/testing/testing/) and add it to your CI/CD pipeline. Setting up `jest` is described [here](https://jestjs.io/docs/en/getting-started#generate-a-basic-configuration-file).

4. Implement a custom `apollo data source` (General information [here](https://www.apollographql.com/docs/apollo-server/data/data-sources/) and [here](https://www.apollographql.com/blog/a-deep-dive-on-apollo-data-sources/)). Data can be stored in-memory, no persisting required. For convenience, you can (optionally) seed your database with dummy data when your server starts. Here's a blueprint:
  ```js
  import { DataSource } from 'apollo-datasource'

  export default class InMemoryDataSource extends DataSource {
    constructor () {
      super()
    }

    initialize ({ context }) {}

    allPosts () {}
    createPost (data) {}
    upvotePost(id, user) {}
  }
  ```

5. Implement resolvers for the [target schema](#target-schema) and test-drive the following features:
   1. List all posts
   2. List all users
   3. Create a post
   4. Upvote a post

Features 3 and 4 need information who is issuing the request. To keep this exercise small, authentication/authorization will be covered in *next exercise*. For now, you can mock the `currentUser` by passing it in `args` (according to schema).

For Feature 4, make sure that every user can upvote a post *only once*. Trying to upvote a post multiple times has no effect.

Also, make sure that it's possible to nest your queries 'indefinitely' without nullifying a nested resource. This should work:
```gql
  {
    posts {
      title
      author {
        name
        posts {
          title
          author {
            name
            # and so on
          }
        }
      }
    }
  }
```

6. PR Review:
   1. Review a pull request of another team.
      * Find at least 6 things (:star: from [Objectives](#objectives)) the other team did or didn't do.
      * Either "Request Changes" or "Approve" *do not just "Comment"*.
      * Suggest changes line-by-line in "Files Changed".
      * Link to your code review in the description of your own pull request
   2. Request a review from another team

## Objectives

:star: For correct folder structure, basic apollo server setup and it's linter in the CI/CD pipeline.

:star: For the `apollo-server-testing` setup and its integration in the CI/CD pipeline.

:star: For implementing a custom data source for apollo-server

For implementing resolvers for the [target schema](#target-schema) and the following features:
1. :star: For listing all posts
2. :star: For listing all users
3. :star: For creating a post
4. :star: For upvoting a post

:star: For preventing users to upvote the same post multiple times.

:star: For 'indefinitely' nestable queries.

:star: For requesting review and reviewing another teams PR according to the instructions.


## Hints

* JavaScript has [Sets](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set), and they are a good option to count the upvotes in this task.
* For easier debugging you could disable automatic polling in the [graphql playground settings](https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/#configuring-playground), set `schema.polling.enable` to `false`.
* If nodejs is not terminating with `Ctrl+C`, follow [this Stackoverflow answer](https://stackoverflow.com/a/53535316) to gracefully shutdown with `SIGINT`.
* If you want universal-hot-reload, see [here](https://github.com/yusinto/universal-hot-reload).
* Random ids can be generated with node's built-in [crypto library](https://stackoverflow.com/a/40191779).
* ES6 `import/export` statements are optional for this task, but they are considered best practice. If you want to show off, you can for instance use [esm](https://github.com/standard-things/esm) to make use of it. Just run `yarn add --dev esm` and add `"dev": "node -r esm index.js",` to your `package.json`.

### Example Test Case (Mutation)

This example

* uses [graphql variables](https://graphql.org/learn/queries/#variables),
* shows how to use [.resolves/.rejects](https://jestjs.io/docs/en/asynchronous#resolves--rejects)
* and how to check that `errors` is `undefined`,
* as well as jest's [toMatchObject](https://jestjs.io/docs/en/expect#tomatchobjectobject)
* in combination with [expect.any](https://jestjs.io/docs/en/expect#expectanyconstructor).

```js
  describe('write(post: $postInput)', () => {
    const opts = {
      mutation: gql`
        mutation($postInput: PostInput!) {
          # ...
        }
      `,
      variables: { /* ... */ }
    }

    it('creates and returns a post', async () => {
      await expect(mutate(opts)).resolves.toMatchObject({
        errors: undefined,
        data: {
          write: {
            id: expect.any(String),
            title: 'New post',
            author: { name: 'Alice' }
          }
        }
      })
    })
  })
```


### Target Schema

```gql
  type Post {
    id: ID!
    title: String!
    votes: Int!
    author: User!
  }

  type User {
    name: ID!
    posts: [Post]
  }

  type Query {
    posts: [Post]
    users: [User]
  }

  type Mutation {
    write(post: PostInput!): Post
    # 🚀 OPTIONAL
    # delete(id: ID!): Post

    # ⚠️ FIXME in exercise #4
    # mock voter until we have authentication
    upvote(id: ID!, voter: UserInput!): Post

    # 🚀 OPTIONAL
    # downvote(id: ID!, voter: UserInput!): Post
  }

  input PostInput {
    title: String!

    # ⚠️ FIXME in exercise #4
    # mock author until we have authentication
    author: UserInput!
  }

  input UserInput {
    name: String!
  }

```

## Optional objectives

:rocket: Implement and test resolvers for the mutations marked as `OPTIONAL`

:rocket: Setup and configure [apollo-client](https://apollo.vuejs.org/guide/installation.html#vue-cli-plugin) in your webapp

:rocket: Call the GraphQL endpoint from your webapp
