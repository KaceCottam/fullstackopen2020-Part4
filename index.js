const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoURL = process.env.MONGODB_URI
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (_, res) => {
  Blog.find({}).then(blogs => res.json(blogs))
})

app.post('/api/blogs', (req, res) => {
  const blog = new Blog(req.body)

  blog.save().then(result => res.status(201).json(result))
})

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
