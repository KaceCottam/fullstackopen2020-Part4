const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (_, res) => {
  Blog
    .find({})
    .then(blogs => res.json(blogs))
    .catch(error => res.json(error))
})

blogsRouter.post('/', (req, res, next) => {
  const blog = new Blog(req.body)

  blog
    .save()
    .then(result => res.json(result.toJSON()))
    .catch(error => next(error))
})


module.exports = blogsRouter

