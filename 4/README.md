# Exercise \#4

Connect your database with Neo4J

**Deadline is December 18th, 2019**

1. Refactor your backend so that all the data is stored in[Neo4J](https://neo4j.com/).
2. You are allowed to use a query builder like [neo4j-graphql-js](https://github.com/neo4j-graphql/neo4j-graphql-js)
   but at least one of your mutations and queries should access the database
   directly with [Neo4j JS driver](https://github.com/neo4j/neo4j-javascript-driver)
   and a custom cypher statement.
3. Your objects in the database should be connected in some way. If you have a
   relationship like
   ```
   (:User)<-[:ASSIGNED]-(:Todo)
   ```
   then this query should return todos and user objects:
   ```gql
   query {
     todos {
       assignedTo {
         name
       }
     }
   }
   ```
4. Implement a filter (`WHERE` in cypher).
5. Implement some ordering (`ORDER BY` in cypher).
6. Implement pagination (`FIRST` and `LIMIT` in cypher).
7. Implement an update mutation that uses `MERGE`.
8. Write backend tests for all of the above.
9. Request a review from @roschaefer.
10. Request a review from sb. else.

If you copy code from other groups, please give credit to them in your commit
messages.
