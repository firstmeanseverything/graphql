const mongoose = require('./connection')
const { Schema } = mongoose

module.exports = mongoose.model(
  'User',
  Schema(
    {
      email: 'String',
      password: 'String',
      stripeID: 'String'
    },
    { discriminatorKey: 'kind' }
  )
)
