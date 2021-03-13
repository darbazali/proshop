'use strict'
console.clear()

import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import config from '../config/config.js'
import connectDB from './lib/connectDB.js'
import { notFound, errorHandler } from './lib/errorMiddleware.js'

// routers
import productRoutes from './routes/productRoutes.js'

dotenv.config()

connectDB()

const app = express()

if (config.env === 'development') {
  app.use(morgan('dev'))
}

app.get('/', (req, res) => {
  res.send('Api is running')
})

app.use('/api/products', productRoutes)

// Not found
app.use(notFound)
app.use(errorHandler)

app.listen(config.port, () => {
  console.log(
    `Server running in ${config.env} on port ${config.port}`.yellow.bold
  )
})
