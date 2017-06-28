const mongoose = require('mongoose')
require('./init')

const productOrderSchema = [{
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  quantity: Number
}]

const orderSchema = mongoose.Schema ({
  products: productOrderSchema,
  cost: Number,
  date: { type: Date, default: Date.now }
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order