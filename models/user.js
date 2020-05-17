const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  passhash: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    minlength: 3
  }
})

userSchema.set('toJSON', {
  transform: (_, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    delete ret.passhash
  }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('user', userSchema)
