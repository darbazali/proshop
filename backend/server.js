'use strict'
console.clear()

import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
// import products from './data/products.js'
import config from '../config/config.js'
import connectDB from './lib/dbConnection.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

import errorMiddleware from './lib/errorMiddleware.js'

const app = express()
dotenv.config()

// connect to db
connectDB()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

// 404
app.use(errorMiddleware.notFound)

// error handling middlware
app.use(errorMiddleware.errorHandler)

app.listen(config.port, () => {
  console.log(
    `Server running in ${config.env} mode on port ${config.port}`.yellow.bold
  )
})
