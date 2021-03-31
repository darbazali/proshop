'use strict'
console.clear()

import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import path from 'path'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

import Stripe from 'stripe'
import { uuid } from 'uuidv4'

dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

import { notFound, errorHandler } from './lib/errorMiddleware.js'

import connectDB from './lib/connectDB.js'
connectDB()

const app = express()

const __dirname = path.resolve()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

/* ========================= STRIPE PAYMENT =========================== */

app.post('/checkout', async (req, res) => {
  // console.log('Request:', req.body)

  let error
  let status
  try {
    const { order, token } = req.body

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    })

    const idempotency_key = uuid()
    const charge = await stripe.charges.create(
      {
        amount: req.body.order.totalPrice * 100,
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotency_key,
      }
    )
    status = 'success'
  } catch (error) {
    console.error('Error:', error)
    status = 'failure'
  }

  res.json({ error, status })
})

/* ========================= END STRIPE PAYMENT =========================== */

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('API is working')
  })
}

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use('/', notFound)
app.use('/', errorHandler)

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port 5000`)
})
