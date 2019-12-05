const neo4j = require('neo4j-driver');
const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
const fs = require('fs');

var SECRET_KEY = fs.readFileSync('./src/key/secret.key', 'utf8');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

let driver;
const uri = "bolt://127.0.0.1:7687";
const username = "neo4j";
const password = "neo4j";

if (!driver) {
  driver = neo4j.driver(uri, neo4j.auth.basic(username, password))
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req}) => {
    let token = req.headers.authorization
    if (token){
      token = token.replace('Bearer ', '')
      try {
        token = {token: jwt.verify(token, SECRET_KEY)}
      }
      catch(err) {
        token = null
      }
    } else {
      token = null
    }
    return {
      driver,
      token
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});



