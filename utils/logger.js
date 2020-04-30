const config = require('./config')

const info = config.NODE_ENV !== 'test' ? console.log : () => {}
const error = console.error
module.exports = { info, error }
