require ('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const productRouter = require('./routes/products')
const orderRouter = require('./routes/orders')

const server = express()

server.use(bodyParser.json())

server.use(productRouter)

port = 1234

server.listen(port, () => {
  console.log(`Started on port ${port}`);
})