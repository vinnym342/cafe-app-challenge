const express = require('express')
const Product = require('../models/product')

const router = express.Router()

router.get('/api/products', (req, res) =>{
  Product.find()
    .then((products) => {
      res.json(products)
    })
    .catch((error) => {
      res.json({ error: error })
    })
})

router.get('/api/products/:id', (req, res) =>{
  const id = req.params.id
  Product.findById(id)
    .then(product => {
      if (product) {
        res.json(product)
      }
      else {
        res.status(404).json({})
      }
    })
    .catch(error => {
      res.json({ error: error })
    })
})


router.post('/api/products', (req, res) => {
  const newProduct = req.body
  Product.create(newProduct)
    .then(newProduct => {
      res.json(newProduct)
    })
    .catch(error => {
      res.json({ error: error })
    })
})

router.put('/api/products/:id', (req, res) => {
  const updateBody = req.body
  const productId = req.params.id
  Product.findByIdAndUpdate(productId,updateBody)
    .then(newProduct => {
      res.json(newProduct)
    })
    .catch(error => {
      res.json({ error: error })
    })
})

router.patch('/api/products/:id', (req, res) => {
  const updateBody = req.body
  const productId = req.params.id
  Product.findByIdAndUpdate(productId,updateBody)
    .then(newProduct => {
      res.json(newProduct)
    })
    .catch(error => {
      res.json({ error: error })
    })
})

router.delete('/api/products/:id', (req,res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (!product) {
      res.status(404).json({error:"not found"})
      }
      res.send('Product Deleted')
    })
    .catch((error) => {
      res.status(500).json({ error: error })
    })
})




module.exports = router