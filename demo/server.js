import { ApolloServer } from 'apollo-server'
import typeDefs from './typeDefs'
import { Post, InMemoryDataSource } from './db'

const db = new InMemoryDataSource()
db.posts = [new Post({ title: 'A post' })]

const dataSources = () => ({ db })

const context = ({ req, res }) => ({ req, res })

const resolvers = {
  Query: {
    posts: (parent, args, context) => context.dataSources.db.posts
  },
  Mutation: {
    write: (parent, args, context) => context.dataSources.db.createPost(args)
  }
}

export default class Server {
  constructor (opts) {
    const defaults = {
      typeDefs,
      resolvers,
      dataSources,
      context
    }
    return new ApolloServer({ ...defaults, ...opts })
  }
}
