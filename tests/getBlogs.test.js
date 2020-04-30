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

afterAll(() => {
  mongoose.connection.close()
})
