const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (_, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body

  const { title, author, url, likes } = body

  const newBlog = {
    title,
    author,
    url,
    likes: likes || 0
  }

  const blog = new Blog(newBlog)

  const savedBlog = await blog.save()

  res.json(savedBlog.toJSON())
})


module.exports = blogsRouter

