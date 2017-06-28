const mongoose = require('mongoose')
require('./init')


const productSchema = mongoose.Schema ({
  name: String,
  price: Number,
  category: String,
  stockRemaining: Number
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product