const express = require('express')
const Order = require('../models/order')
const Product = require('../models/product')
const mongoose = require('mongoose')

const router = express.Router()

router.get('/api/orders', (req, res) =>{
  Order.find()
    .populate('products.product')
    .then((orders) => {
      res.json(orders)
    })
    .catch((error) => {
      res.json({ error: error })
    })
})

router.get('/api/orders/:id', (req, res) =>{
  const id = req.params.id
  Order.findById(id)
    .populate('products.product')
    .then(order => {
      if (order) {
        res.json(order)
      }
      else {
        res.status(404).json({})
      }
    })
    .catch(error => {
      res.json({ error: error })
    })
})

router.post('/api/orders', (req, res) => {
  const products = req.body.products
  const productIds = products.map(productObject => {
    return [ mongoose.Types.ObjectId(`productObject.product`)]
  })
  Product.find({"_id": { $in: productIds} })
  .then(products => {
    
  })
  .catch(error => {
    res.json({ error })
  })

  // const totalPrice = prices.reduce((total,price)=> {
  //   return total + price
  // })
  // Order.create()
  //   .then(newOrder => {
  //     res.json(newOrder)
  //   })
  //   .catch(error => {
  //     res.json({ error: error })
  //   })
})

module.exports = router