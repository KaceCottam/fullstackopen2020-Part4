const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initial_blogs) {
    let blogObject = Blog(blog)
    await blogObject.save()
  }
})

test('json is return from GET', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs returned from GET', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initial_blogs.length)
})

test('all blogs have id, but not _id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  blogs.forEach(blog => {
    expect(blog.id).toBeDefined()
    expect(blog._id).not.toBeDefined()
  })
})

describe('HTTP POST', () => {
  test('HTTP post works as intended', async () => {
    const newBlog = new Blog({
      title: "Something random",
      author: "Kendell",
      url: "www.virtuallens.com",
      likes: 100,
    })

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toBeDefined()

    const blogs = await api.get('/api/blogs')
    expect(blogs.body).toHaveLength(helper.initial_blogs.length + 1)
  })

  test('HTTP post with no likes defaults to 0', async () => {
    const newBlog = new Blog({
      title: "Something random",
      author: "Kendell",
      url: "www.virtuallens.com"
    })

    const response = await api.post('/api/blogs').send(newBlog)

    const body = response.body

    expect(body.likes).toBeDefined()
    expect(body.likes).toBe(0)

  })

  test('HTTP post with bad object', async () => {
    const newBlog = new Blog({
      url: "www.virtuallens.com"
    })

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('HTTP DELETE', () => {
  test('Delete works with valid id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    const firstBlog = blogs[0]

    await api.delete(`/api/blogs/${firstBlog.id}`).expect(200)
  })

  test('Delete works with invalid id', async () => {
    const invalidId = await helper.nonExistingId()

    await api.delete(`/api/blogs/${invalidId}`).expect(200)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
