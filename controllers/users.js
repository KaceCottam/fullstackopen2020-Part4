const bcrypt = require('bcryptjs')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if(password.length <= 3) {
    return res.status(400).json({ error: "password length must be >3" })
  }

  const salts = 10
  const passhash = await bcrypt.hash(password, salts)

  const newUser = User({ name, username, passhash })

  await newUser.save()
  res.json(newUser.toJSON())
})

userRouter.get('/', async (_, res) => {
  const users = await User.find({})
  res.json(users.map(u => u.toJSON()))
})

module.exports = userRouter
