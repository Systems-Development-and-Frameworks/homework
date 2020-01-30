const { applyMiddleware } = require('graphql-middleware')
const { ApolloServer, gql } = require('apollo-server')
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
type Student {
  id: ID
  firstname: String
  lastname: String
  fullname(reverse: Boolean): String
}

type Query {
  student(id: ID): Student
  allStudents(limit: Int): [Student]
}
`
const students = [
  { id: 1, firstname: 'Alice', lastname: 'Wonderland' },
  { id: 2, firstname: 'Bob', lastname: 'Builder' },
  { id: 3, firstname: 'Mallory', lastname: 'Malicious' },
]

const middleware = {
  Student: {
    fullname: (resolve, parent, args, context, resolveInfo) => {
      const result = resolve(parent, args, context, resolveInfo)
      console.log('Student.fullname resolved:', result)
      return result
    }
  }
}

const resolvers = {
  Query: {
    student: (parent, args, context, resolveInfo) => {
      console.log('Query.student:', parent, args)
      return students.find(student => student.id === args.id)
    },
    allStudents: (parent, args, context, resolveInfo) => {
      console.log('Query.allStudents:', parent, args)
      return students.slice(0, args.limit || students.length)
    },
  },
  Student: {
    fullname: (parent, args, context, resolveInfo) => {
      console.log('Student.fullname:', parent, args)
      if (args.reverse) return [parent.lastname, parent.firstname].join(', ')
      return [parent.firstname, parent.lastname].join(' ')
    }
  }
}

let schema = makeExecutableSchema({ typeDefs, resolvers })
schema = applyMiddleware(schema, middleware )
const server = new ApolloServer({ schema });
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
