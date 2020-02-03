const {AuthenticationError} = require("apollo-server-errors");
const jwt = require('jsonwebtoken');
const users = require('./users')

const resolvers = {
  Query: {
    todos: async (parent, args, context) => {
      const currentUser = context.user.name;
      let page = 0;
      let size = 20;
      if (typeof args.page != "undefined") page = args.page;
      if (typeof args.size != "undefined") size = args.size;

      console.log('INFO - Got ALL_TODOS_QUERY from user ' + currentUser);
      const session = context.driver.session();
      const todosQuery = await session.run(
        'MATCH (t:Todo)-[:BELONGS]->(u:User)\n' +
        'WHERE u.name = ' + userName + '\n' +
        'RETURN t, u\n' +
        'ORDER BY t.text DESC\n' +
        'SKIP ' + (page * size) + '\n'
        'LIMIT ' + limit + '\n');
      const todos = todosQuery.records.map(todo => {
        let abc = todo.get('t').properties;
        abc.user = todo.get('u').properties;
        return abc;
      });
      return todos;
    }
  },
  Mutation: {
    loginUser: (object, params)  => {
      const { username, password} = params;
      let theUser = users.find(user => user.username === username );

      if(theUser === undefined){
        throw new AuthenticationError(
          "Username undefined"
        );
      }
      if(theUser.password !== password){
        throw new AuthenticationError(
          "Wrong password"
        )
      }
      return {token : jwt.sign(theUser, "12345")};
    }
    deleteTodo: async (parent, args, context) => {
      todos.pop()
      return true
    }
  }
};

module.exports = resolvers;
