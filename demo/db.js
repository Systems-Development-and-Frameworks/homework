import { DataSource } from 'apollo-datasource'
import crypto from 'crypto'

export class Post {
  constructor (data) {
    this.id = crypto.randomBytes(16).toString('hex')
    Object.assign(this, data)
  }
}

export class InMemoryDataSource extends DataSource {
  constructor () {
    super()
    this.posts = []
  }

  initialize (...args) {
    // console.log(args)
  }

  createPost (data) {
    const newPost = new Post(data)
    this.posts.push(newPost)
    return newPost
  }
}
