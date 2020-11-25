# Exercise #4

| Deadline                   | Date                   |
| -------------------------- | ---------------------- |
| Review due date (optional) | 02.12.2020 - 14:00     |
| **Final Due date**         | **09.12.2020 - 14:00** |

## Goal

In this exercise, you're going to learn the concepts of [Authentication](https://en.wikipedia.org/wiki/Authentication) with [JWT](https://jwt.io/) and [Authorization](https://en.wikipedia.org/wiki/Authorization) with [graphql-shield](https://github.com/maticzav/graphql-shield). For the latter, you need an understanding of the "middleware" software pattern as defined by [express](https://github.com/maticzav/graphql-shield). An implementation for [apollo-server](https://github.com/apollographql/apollo-server) is [graphql-middleware](https://github.com/prisma-labs/graphql-middleware).

Extend exercise [#1](../1), [#2](../2) and [#3](../3) with the new [objectives](#objectives).

## Instructions

1. Refactor your current graphql schema to match the new [target schema](#target-schema).
2. Implement a signup mutation for new users using email and password
 * Accept only passwords with a length of at least 8 characters.
 * Make sure the `email` address is not taken by another user.
3. Implement a login mutation for existing (signed up) users.
  * Add a graphql [context](https://www.apollographql.com/docs/apollo-server/api/apollo-server/#context) to your Apollo Server and verify a [JWT Bearer token](https://jwt.io/introduction/) from the `Authorization` HTTP request header, see our [hints](#hints).
4. Do not commit common security mistakes:
  * Use [bcrypt](https://www.npmjs.com/package/bcrypt) to hash passwords.
  * Do not check your JWT secret into version control, see our [hints](#hints).
  * Do not expose password hashes in the JWT payload. Also do not expose private information like `email` unnecessarily.
  * Specific to our use-case: Make sure a JWT is only valid if a corresponding user in the database exists. The user might have been deleted or disabled since the JWT was issued.
5. Test-drive the following refactorings:
  * `write` a post assigns the authenticated user as author.
    * Unauthenticated requests throw an error.
  * `upvote` a post assigns the authenticated user as voter.
    * Unauthenticated requests throw an error.
6. PR Review:
  * Review a pull request of another team.
    * Find at least 6 things (:star: from [Objectives](#objectives)) the other team did or didn't do.
    * Either "Request Changes" or "Approve" *do not just "Comment"*.
    * Suggest changes line-by-line in "Files Changed".
    * Link to your code review in the description of your own pull request.
  * Request a review from another team
7. Rebase your `main` branch on top of `homework/main`.

## Objectives

:star: For an implemented `signup` feature.

:star: For a software-tested `signup` feature.

:star: For password validation.

:star: For unique email address validation.

:star: For not having security issues according to instructions.

:star: For an implemented `login` feature using JWT.

:star: For a software-tested `login` feature.

:star: For assigning the authenticated user to a post in `write` and `upvote` mutations.

:star: For requesting a review and reviewing another team's PR according to the instructions.

:star: For a successful rebase on `homework/main`.

All objectives must be implemented according to the [instructions](#instructions).

## Optional Objectives

:rocket: For software-tested authorization errors on `write` and `upvote` mutations.

:rocket: For authorizing read access on `User.email`:
  * Allows access only if `email` belongs to authenticated user.

:rocket: For authorizing `delete` mutation:
  * Only authors of a post are allowed to delete their own posts.

:rocket: For adding a fallback authorization rule:
  * Access is denied on all mutations and queries which are not explicitly white-listed.

## Hints

* [nodemon](https://www.npmjs.com/package/nodemon) is an alternative to [unversal-hot-reload](https://www.npmjs.com/package/universal-hot-reload) in development.
* If you need, you could use mock function [matchers](https://jestjs.io/docs/en/mock-functions#custom-matchers) to assert certain functions of your custom `DataSource` have been called.
* Use [resolvers merging](https://www.graphql-tools.com/docs/merge-resolvers/) to split your resolvers into multiple files.
* Use JavaScript [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) to ensure data integrity, encrypt passwords and set default values.
* Here is a blueprint for your [context function](https://www.albertgao.xyz/2019/12/01/how-to-use-graphql-shield-with-apollo-server-to-authorize-JWT/).
* For authorization, install [graphql-middleware](https://github.com/prisma-labs/graphql-middleware) and [graphql-shield](https://github.com/maticzav/graphql-shield) and make yourself familiar with both.
  * Be aware that we don't use `graphql-yoga`, so follow the instructions for the [standalone usage](https://github.com/prisma-labs/graphql-middleware#standalone-usage) instead.
* Use the [dotenv](https://www.npmjs.com/package/dotenv) package to load secrets from your environment variables or a local `.env` file.

### Target Schema

```gql
  type Post {
    id: ID!
    title: String!
    votes: Int!
    author: User!
  }

  type User {
    # ⚠️ attributes 'id' and 'name' have changed!
    # 'id' now represents a randomly generated string, similar to 'Post.id'
    id: ID!
    name: String!
    email: String!
    posts: [Post]
  }

  type Query {
    posts: [Post]
    users: [User]
  }

  type Mutation {
    write(post: PostInput!): Post
    upvote(id: ID!): Post
    # 🚀 OPTIONAL
    # downvote(id: ID!): Post
    # 🚀 OPTIONAL
    # delete(id: ID!): Post

    """
    returns a signed JWT or null
    """
    login(email: String!, password: String!): String

    """
    returns a signed JWT or null
    """
    signup(name: String!, email: String!, password: String!): String
  }

  input PostInput {
    title: String!
  }
```
