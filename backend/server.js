'use strict'
console.clear()
global.log = console.log

import express from 'express'
import bodyParser from 'body-parser'
import colors from 'colors'

import { config } from 'dotenv'

import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoute from './routes/userRoute.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

connectDB()

const app = express()
config() // dotenv

// middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const { PORT, NODE_ENV } = process.env

app.get('/', (req, res) => {
  res.send('API is working..')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoute)

app.use(notFound)

app.use(errorHandler)

app.listen(
  PORT,
  log(`Server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold)
)
