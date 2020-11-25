import { ApolloServer } from 'apollo-server'
import typeDefs from './typeDefs'
import { Post, InMemoryDataSource } from './db'

const db = new InMemoryDataSource()
db.posts = [new Post({ title: 'A post' })]

const dataSources = () => ({ db })

const context = ({ req, res }) => ({ req, res })

const resolvers = {
  Query: {
    posts: (parent, args, context) => context.dataSources.db.posts,
    promises: () => {
      console.log('Started execution!')
      return [
        {id: '1', calls: 0},
        {id: '2', calls: 0},
        {id: '3', calls: 0},
      ]
    }
  },
  Mutation: {
    write: (parent, args, context) => context.dataSources.db.createPost(args)
  },
  Promise: {
    nested: (parent) => new Promise((resolve) => {
      setTimeout(() => {
        const calls = parent.calls + 1
        console.log(`Promise ${parent.id}: ${calls}. nested call`)
        resolve({...parent, calls})
      }, parent.id * 1000)
    })
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
