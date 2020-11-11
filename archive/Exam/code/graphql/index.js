const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
type Student {
  id: ID
  firstname: String
  lastname: String
  fullname(reverse: Boolean): String
}

type Query {
  student(id: ID): Student
  allStudents: [Student]
}
`
const students = [
  { id: '1', firstname: 'Bob', lastname: 'Builder' },
  { id: '2', firstname: 'Alice', lastname: 'Wonderland' },
]

const resolvers = {
  Query: {
    student: (parent, args, context, resolveInfo) => {
      console.log('Query.student:', parent, args)
      return students.find(student => student.id === args.id)
    },
    allStudents: (parent, args, context, resolveInfo) => {
      console.log('Query.allStudents:', parent, args)
      return students
    },
  },
  Student: {
    fullname: (parent, args, context, resolveInfo) => {
      console.log('Student.fullname:', parent.id, args)
      if (args.reverse) return [parent.lastname, parent.firstname].join(', ')
      return [parent.firstname, parent.lastname].join(' ')
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
