const _ = require('lodash')

const dummy = () => {
 return 1
}

const totalLikes = blogs => {
  const sum = (x, y) => x + y
  return blogs.map(b => b.likes).reduce(sum, 0)
}

const favoriteBlog = blogs => {
  const reducer = (acc, blog) =>
    blog.likes > acc.likes ? blog : acc

  return blogs.length === 0
    ? undefined
    : blogs.reduce(reducer)
}

const mostBlogs = blogs => {
  if (blogs.length === 0) return undefined
  const auth = _.last(_.sortBy(_.groupBy(blogs.map(p => p.author)), 'length'))
  return { author: auth[0], blogs: auth.length }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }
