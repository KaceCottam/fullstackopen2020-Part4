const Blog = require('../models/blog')

const initial_blogs = [
  {
    title: "Hello, world!",
    author: "Kace",
    url: "www.google.com",
    likes: 5,
    id: "5e9b560d99a17f1c8ed08d69"
  },
  {
    title: "Something",
    author: "Kace",
    url: "www.example.com",
    likes: 10,
    id: "5e9a560d99a17f1c8ed08d69"
  },
  {
    title: "Something Else",
    author: "Deb",
    url: "www.example2.com",
    likes: 40,
    id: "5e9a560d99a17f1c8ed08d60"
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: "Hello, world!",
    author: "Kace",
    url: "www.google.com",
    likes: 5,
  })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = { initial_blogs, nonExistingId, blogsInDb }
