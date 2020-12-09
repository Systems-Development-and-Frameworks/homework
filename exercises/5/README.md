# Exercise #5

| Deadline                   | Date                   |
| -------------------------- | ---------------------- |
| Review due date (optional) | 16.12.2020 - 14:00     |
| **Final Due date**         | **06.01.2021 - 14:00** |

## Goal

We, the [`@mentors`](https://github.com/orgs/Systems-Development-and-Frameworks/teams/mentors), decided to focus in this exercise on an advanced feature of GraphQL: [GraphQL
schema stitching](https://www.graphql-tools.com/docs/stitch-combining-schemas)
and [schema delegation](https://www.graphql-tools.com/docs/stitch-combining-schemas).

Extend exercise [#1](../1), [#2](../2), [#3](../3) and [#4](../4) with the new
[objectives](#objectives).

You can choose between two different architectures:
1. Remote GraphQL API
2. Local Neo4J DB

## Instructions

1. Choose a GraphQL [architecture](#architectures) fitting to your needs. Write
installation instructions in the `README.md` and explain why you have chosen the
architecture based on your use-case. Be creative.

2. If you require API keys (e.g. [Remote API](#using-a-remote-graphqlrest-api)
scenario), put them into a `.env` file and encrypt this file with [git-crypt](https://github.com/AGWA/git-crypt).
Do the following:
  * Install `git-crypt`,
  * rebase your branch on latest `homework/main`,
  * download the symmetric key from our [Moodle course](https://moodle.htw-berlin.de/course/view.php?id=29222),
  * move the symmetric key to `/git-crypt-key`,
  * run `git-crypt unlock git-crypt-key` in the root folder,
  * and add your files to `/.gitattributes` according to the [documentation](https://github.com/AGWA/git-crypt#using-git-crypt).

3. Refactor your mutations and queries. Ensure that data created during a
mutation is persisted, ie. it is still there after a server restart. Any
mutation which does not persist data will cost you a :star:. Queries and
mutations must get their data from your chosen database or API endpoint.

4. Ensure that your software tests have no side-effects, ie. your tests do not
interfere with each other. Any software test case that introduces a side-effect
will cost you a :star:. Do not simply delete software tests that were required
previously. You can ensure side-effect-free tests by either:
  * Cleaning the database before or after your tests
  * or not writing any data in your tests. E.g. you mock the response of your
database or remote API.

5. Make sure your database is never left in some invalid state after a mutation.
An example is an orphaned post, ie. a post without author. In case you have
multiple database calls in one of your resolvers, run them in a transaction.

6. Your target schema remains the same and must behave as expected. Additional
mutations and queries that are introduced by a subschema must throw a
`Forbidden` GraphQL error when called by the client directly.

7. PR Review:
  * Review a pull request of another team.
    * Find at least 6 things (:star: from [Objectives](#objectives)) the other
    team did or didn't do.
    * Either "Request Changes" or "Approve" *do not just "Comment"*.
    * Suggest changes line-by-line in "Files Changed".
    * Link to your code review in the description of your own pull request.
  * Request a review from another team

## Objectives

:star: For choosing a scenario and writing installation instructions in `README.md`.

:star: For explaining *WHY* you have chosen the scenario in the `README.md`.

:star: For not committing sensitive secrets (e.g. API keys) unencrypted to the
repository.

:star: :star: Data created in mutations are persisted and your queries
and mutations still work as expected.

:star: :star: Your software tests are free of side effects.

:star: Your database is never left in an invalid state.

:star: You deny the client to call mutations and queries of your subschema
directly.

:star: For requesting a review and reviewing another team's PR.

All objectives must be implemented according to the [instructions](#instructions).

## Architectures

Choose one of the architectures below. Combinations are possible.

### Using a Remote GraphQL API

If you don't want to host a database yourself, you can use a headless CMS which
comes with a nice UI for your administrators and editors.

![Remote GraphQL API](../../.github/img/scenario2.png)

Please, encrypt your API keys with a symmetric key shared in our [Moodle course](https://moodle.htw-berlin.de/course/view.php?id=29222) and commit them to your repository. This is an [objective](#objectives).

Since you are using an external API, you **must** use mocks in your software
tests when your resolvers would otherwise call your endpoint. You do not want
your build server to produce traffic during builds or other side-effects.

You must choose a headless CMS with a GraphQL endpoint that supports queries
**and mutations**. Have a look into [this comparison](https://cms-comparison.io/#/list)
and order by "GraphQL: Mutations".

A suggestion is e.g. [GraphCMS](https://graphcms.com/).

Here is [demo code](https://github.com/Systems-Development-and-Frameworks/homework/tree/demo/demo)
how to setup schema delegation for a remote graphql schema. And this is how your
schema implementation might look like:

```js
import { stitchSchemas } from '@graphql-tools/stitch';
import typeDefs from './typeDefs';
import Resolvers from './resolvers';
import RemoteSchema from './graphCms/schema';

export default async () => {
  const remoteSchema = await RemoteSchema();
  const resolvers = Resolvers({ subschema: remoteSchema });

  return stitchSchemas({
    subschemas: [remoteSchema],
    typeDefs,
    resolvers,
  });
};
```

### Neo4J and neo4j-graphql-js

This is the solution that we're going to cover in the lecture.

![Neo4J-GraphQL-JS](../../.github/img/scenario3.png)

First, get familiar with [Neo4J](https://neo4j.com/) and setup the database
locally. You can either choose to install the database on your host machine, by
following the [installation instructions](https://neo4j.com/docs/operations-manual/current/installation/),
or you could run the database with [docker](https://www.docker.com/):

```
$ docker run  --publish=7474:7474 --publish=7687:7687 --env=NEO4J_AUTH=none neo4j:latest
```

In your custom resolvers, you have a couple of options to interact with your
database:
1. You could use [neo4j-driver](https://github.com/neo4j/neo4j-javascript-driver)
to open a direct connection,
2. you could use [neode](https://github.com/adam-cowley/neode) which is an
OG-mapper for Neo4J.

There is an open [pull request at `neo4j-graphql-js`](https://github.com/neo4j-graphql/neo4j-graphql-js/pull/550) which demonstrates how to use schema stitching and schema delegation with
Neo4j.

Here is how your schema delegation might look like:

```js
import { stitchSchemas } from '@graphql-tools/stitch';
import typeDefs from './typeDefs';
import Resolvers from './resolvers';
import localSchema from './neo4j-graphql-js/schema';

export default () => {
  const resolvers = Resolvers({ subschema: localSchema });
  return stitchSchemas({
    subschemas: [localSchema],
    typeDefs,
    resolvers
  });
};
```


## Optional Objectives

:rocket: Implement an aggregated field `postCount`, which returns the number of
posts written by a `User` or `Person`:
```gql
extend type Person {
  postCount: Int
}
```

:rocket: Implement an aggregated field `authored`, which is `true` if the
authenticated user has written a post:
```gql
extend type Post {
  authored: Boolean
}
```

:rocket: Use a DataSource to Access Your Database Directly

Using [MongoDB](https://www.mongodb.com/) and [apollo-datasource-mongodb](https://github.com/GraphQLGuide/apollo-datasource-mongodb) looks quite straightforward. There is also [sql-datasource](https://github.com/cvburgess/SQLDataSource).

![Apollo-Server <--> Database](../../.github/img/scenario1.png)

:rocket: Use a RESTDataSource to Access a Remote REST API

You could use `RESTDataSource` as described in the [official documentation](https://www.apollographql.com/docs/apollo-server/data/data-sources/#rest-data-source)
of apollo server. You might want to have a look into this [blog post](https://graphql.org/blog/rest-api-graphql-wrapper/).

From the architectural point of view, this is similar to a remote [graphql api](#using-a-remote-graphql-api).
Most likely, performance will be worse, because your type resolvers are going to
make additional calls to the endpoint. Yet, this is a nice exercise, because
this is what you're going to do if you face a legacy API.
