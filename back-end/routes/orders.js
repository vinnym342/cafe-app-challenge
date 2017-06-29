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
  const updatePromises = products.map((productOrder,index,array)=>{
    let quantityOrdered = productOrder.quantity
    let itemId = productOrder.product
    return Product.findById(itemId)
    .then(productDocument=>{
      if (productDocument.stockRemaining >= quantityOrdered){
        productDocument.stockRemaining -= quantityOrdered
        return productDocument.save()
          .then(() => {
            // Work out cost
            return productDocument.price * quantityOrdered
          })
      } else {
        throw new Error(`The item ${productDocument.name} does not have enough
          quantity for that order`)
      }
    })
  })

  Promise.all(updatePromises)
    .then((costs)=>{
      const totalCost = costs.reduce((a,b)=>{
        return a + b
      },0)
      Order.create({products: products, cost: totalCost})
      .then(order =>{
        res.json({message: "Order successfully created! Food on its way :)",order: order})
      })
    })
    .catch(error=>{
      res.status(400).json({error: error})
    })
})

module.exports = router
