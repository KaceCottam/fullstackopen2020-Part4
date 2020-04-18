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

module.exports = { dummy, totalLikes, favoriteBlog }
