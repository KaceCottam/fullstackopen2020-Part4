const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const userSchema = new mongoose.Schema({
  username: String,
  passhash: String,
  name: String
})

userSchema.set('toJSON', {
  transform: (_, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    delete ret.passhash
  }
})

module.exports = mongoose.model('user', userSchema)
