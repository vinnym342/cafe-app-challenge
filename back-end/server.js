require ('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const productRouter = require('./routes/products')
const orderRouter = require('./routes/orders')
const cors = require('cors')

const server = express()

server.use(bodyParser())
server.use(cors()).kahsbkhvbdkzfgkhsdbfkjbgkh

server.use(productRouter)
server.use(orderRouter)

port = 1234

server.listen(port, () => {
  console.log(`Started on port ${port}`);
})

console.log('i made a cblahj;lawjf;oiwaehfhange!')
