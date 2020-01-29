const { applyMiddleware } = require('graphql-middleware')
const { ApolloServer, gql } = require('apollo-server')
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
type Query {
  hello(name: String): String
  bye(name: String): String
}
`

const logInput = async (resolve, parent, args, context, info) => {
  console.log(`1. logInput: ${JSON.stringify(args)}`)
  const result = await resolve(parent, args, context, info)
  console.log(`5. logInput`)
  return result
}

const logResult = async (resolve, parent, args, context, info) => {
  console.log(`2. logResult`)
  const result = await resolve(parent, args, context, info)
  console.log(`4. logResult: ${JSON.stringify(result)}`)
  return result
}

const middlewares = [logInput, logResult]

const resolvers = {
  Query: {
    hello: (parent, args, context, info) => {
      console.log(`3. resolver: hello`)
      return `Hello ${args.name ? args.name : 'world'}!`
    },
    bye: (parent, args, context, info) => {
      console.log(`3. resolver: bye`)
      return `Bye ${args.name ? args.name : 'world'}!`
    },
  },
}

let schema = makeExecutableSchema({ typeDefs, resolvers })
schema = applyMiddleware(schema, ...middlewares)
const server = new ApolloServer({ schema });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
