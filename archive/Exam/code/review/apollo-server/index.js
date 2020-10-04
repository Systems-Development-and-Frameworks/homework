const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-errors');
const typeDefs = require('./typedefs.js')
const { todos, users } = require('./data.js')

const resolvers = {
  Query: {
    // ommitted for simplicity
  },
  Mutation: {
    deleteToDo: (object, input) =>{
      const decrypted = decryptedToken(input.token);
      todos.splice(input.index, 1);
    },
    updateToDo: (object, input) => {
      const decrypted = decryptedToken(input.token);
      todos[input.index].title = input.title;
    },
    loginUser: (object, params)  => {
      const { username, password} = params;
      let theUser = users.find(
        user => user.username === username );

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
  }
};
