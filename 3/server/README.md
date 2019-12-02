### Start the server

```shell script
npm init --yes
npm install apollo-server graphql
touch apollo_todo.js
```

#####  GraphQL queries
```javascript
# Write your query or mutation here
 query AllTodos{
   todos{
     message
     id
   }
 }
 
 mutation NewTodo{
   addTodo(message: "Apollo Server starten") {
     message
   }
 }
 
 mutation RemoveTodo{
   deleteTodo(id: 3)
 }
 
 mutation EditTodo{
   editTodo(id: 3, message: "Apollo Server zweimal Starten"){
     message
   }
 }
```