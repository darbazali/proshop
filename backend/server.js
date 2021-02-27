import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'
import config from '../config/config.js'

const app = express()
dotenv.config()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running')
})
app.get('/api/products', (req, res) => {
  res.json(products)
})
app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id == req.params.id)
  res.json(product)
})

app.listen(config.port, () => {
  console.log(`Server running in ${config.env} mode on port ${config.port}`)
})
