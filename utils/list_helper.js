const { last, sortBy, groupBy, map, reduce, sum, chain } = require('lodash')

const dummy = () => {
 return 1
}

const totalLikes = blogs => {
  const sum = (x, y) => x + y
  return reduce(map(blogs, 'likes'), sum, 0)
}

const favoriteBlog = blogs => {
  const reducer = (acc, blog) =>
    blog.likes > acc.likes ? blog : acc

  return blogs.length === 0
    ? undefined
    : reduce(blogs, reducer)
}

const mostBlogs = blogs => {
  if (blogs.length === 0) return undefined
  const auth = last(sortBy(groupBy(map(blogs, 'author')), 'length'))
  return { author: auth[0], blogs: auth.length }
}

const mostLikes = blogs => blogs.length === 0
  ? undefined
  : chain(blogs)
    .groupBy('author')
    .map((v, k) => ({ author: k, likes: sum(map(v, 'likes')) }))
    .reduce((acc, b) => b.likes > acc.likes ? b : acc)
    .value()


module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
