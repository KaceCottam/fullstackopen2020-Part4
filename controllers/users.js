const bcrypt = require('bcryptjs')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (req, res) => {
  const user = req.body

  const salts = 10
  const passhash = await bcrypt.hash(user.password, salts)
  
  const newUser = new User({
    name: user.name,
    username: user.username,
    passhash
  })

  await newUser.save()
  res.json(newUser.toJSON())
})

userRouter.get('/', async (_, res) => {
  const users = await User.find({})
  res.json(users.map(u => u.toJSON()))
})

module.exports = userRouter
