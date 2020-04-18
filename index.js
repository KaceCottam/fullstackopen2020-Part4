const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
// app.get('/api/blogs', (_, res) => {
//   Blog
//     .find({})
//     .then(blogs => res.json(blogs))
//     .catch(error => res.json(error))
// })

// app.post('/api/blogs', (req, res) => {
//   const blog = new Blog(req.body)

//   blog
//     .save()
//     .then(result => res.status(201).json(result))
//     .catch(error => res.json(error))
// })

// const PORT = process.env.PORT || 3003
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

