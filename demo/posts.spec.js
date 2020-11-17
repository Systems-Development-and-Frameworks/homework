import { createTestClient } from 'apollo-server-testing'
import { gql } from 'apollo-server'
import Server from './server.js'
import { InMemoryDataSource, Post } from './db.js'

// FIXME: not re-initializing db introduces a non-atomic test
let db = new InMemoryDataSource()
const server = new Server({ dataSources: () => ({ db }) })

const { query, mutate } = createTestClient(server)

describe('queries', () => {
  describe('POSTS', () => {
    const POSTS = gql`
      query {
        posts {
          id
          title
        }
      }
    `

    it('returns empty array', async () => {
      await expect(query({ query: POSTS }))
        .resolves
        .toMatchObject({
          errors: undefined,
          data: { posts: [] }
        })
    })

    describe('given posts in the database', () => {
      beforeEach(() => {
        db.posts = [new Post({ title: 'Some post' })]
      })

      it('returns posts', async () => {
        await expect(query({ query: POSTS }))
          .resolves
          .toMatchObject({
            errors: undefined,
            data: { posts: [{ title: 'Some post', id: expect.any(String) }] }
          })
      })
    })
  })
})

describe('mutations', () => {
  beforeEach(() => {
    db = new InMemoryDataSource()
  })

  describe('WRITE_POST', () => {
    const action = () => mutate({ mutation: WRITE_POST, variables: { title: 'Some post' } })
    const WRITE_POST = gql`
    mutation($title: String!) {
      write(title: $title) {
        id
        title
      }
    }
  `

    it('adds a post to db.posts', async () => {
      expect(db.posts).toHaveLength(0)
      await action()
      expect(db.posts).toHaveLength(1)
    })

    it('calls db.createPost', async () => {
      db.createPost = jest.fn(() => {})
      await action()
      expect(db.createPost).toHaveBeenCalledWith({ title: 'Some post' })
    })

    it('responds with created post', async () => {
      await expect(action())
        .resolves
        .toMatchObject({
          errors: undefined,
          data: { write: { title: 'Some post', id: expect.any(String) } }
        })
    })
  })
})
