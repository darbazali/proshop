'use strict'
console.clear()

import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import config from '../config/config.js'
import connectDB from './lib/connectDB.js'

// routers
import productRoutes from './routes/productRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
  res.send('Api is running')
})

app.use('/api/products', productRoutes)

app.listen(config.port, () => {
  console.log(
    `Server running in ${config.env} on port ${config.port}`.yellow.bold
  )
})
