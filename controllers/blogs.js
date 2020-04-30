const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (_, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body

  const { title, author, url, likes } = body

  if ( !title || !author || !url ) {
    return res.status(400).end()
  }

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

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id

  await Blog.findByIdAndRemove(id)

  res.status(200).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id

  const body = req.body

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, body)
    res.json(updatedBlog.toJSON())
  } catch {
    return res.status(404).end()
  }
})


module.exports = blogsRouter

