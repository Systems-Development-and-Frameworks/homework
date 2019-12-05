### Start the server

```shell script
npm install
npm start
```

#####  GraphQL queries
```javascript
# Write your query or mutation here
query AllTodos{
  todos{
    message
    completed
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

mutation FirstLogin{
  login(usr:"dducky", pwd:"phantomiasiscool")
}

mutation FinishItem{
  finishTodo(id:1){
    message
  	completed
  }
}
```