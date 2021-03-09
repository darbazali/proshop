'use strict'
console.clear()

import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import path from 'path'
import colors from 'colors'
// import products from './data/products.js'
import config from '../config/config.js'
import connectDB from './lib/dbConnection.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

import errorMiddleware from './lib/errorMiddleware.js'

const app = express()
dotenv.config()

// connect to db
connectDB()

app.use(express.json())
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/uploads', uploadRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('API is running')
  })
}

// 404
app.use(errorMiddleware.notFound)

// error handling middlware
app.use(errorMiddleware.errorHandler)

app.listen(config.port, () => {
  console.log(
    `Server running in ${config.env} mode on port ${config.port}`.yellow.bold
  )
})
