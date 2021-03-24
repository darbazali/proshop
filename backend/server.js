'use strict'
console.clear()

import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import config from '../config/config.js'
import connectDB from './lib/connectDB.js'
import { notFound, errorHandler } from './lib/errorMiddleware.js'

import Stripe from 'stripe'
const stripe = new Stripe(
  'sk_test_51IVXy6BZgPXm2bZZBWOAgZjDIIQVdYJKfxKGO4J81eFSg7rnuKK50u8ol7ErhONjeGdfzfyirMIPTaFmIkPJzMDO00Z0JslPyI'
)

// routers
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

if (config.env === 'development') {
  app.use(morgan('dev'))
}

app.get('/', (req, res) => {
  res.send('Api is running')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

// stripe route
app.post('/checkout', async (req, res) => {
  const { token, order } = req.body

  stripe.customers
    .create({
      email: token.card.name,
      source: token.id,
    })
    .then((customer) =>
      stripe.charges.create({
        amount: 250,
        description: 'Description',
        currency: 'usd',
        customer: customer.id,
      })
    )
    .then((charge) => res.json(charge))
})

// Not found
app.use(notFound)
app.use(errorHandler)

app.listen(config.port, () => {
  console.log(
    `Server running in ${config.env} on port ${config.port}`.yellow.bold
  )
})
