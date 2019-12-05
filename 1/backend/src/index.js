const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
const fs = require('fs');

var SECRET_KEY = fs.readFileSync('./src/key/secret.key', 'utf8');

const typeDefs = require('./schema');
const resolvers = require('./resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req}) => {
    const token = req.headers.authorization.replace('Bearer ', '')
    if (token){
      return {token: jwt.verify(token, SECRET_KEY)}
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});


