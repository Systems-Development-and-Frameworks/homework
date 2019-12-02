const {AuthenticationError} = require("apollo-server-errors");
const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
const fs = require('fs');

var SECRET_KEY = fs.readFileSync('./src/key/secret.key', 'utf8');

const typeDefs = require('./schema');
const resolvers = require('./resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => {
    const token = req.headers.authorization;
    if (token){
      return(jwt.verify(token, SECRET_KEY) ? token : null);
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});


