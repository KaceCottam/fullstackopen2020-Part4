const dummy = blogs => {
 return 1
}

const totalLikes = blogs => {
  const sum = (x, y) => x + y
  return blogs.map(b => b.likes).reduce(sum, 0)
}

module.exports = { dummy, totalLikes }
