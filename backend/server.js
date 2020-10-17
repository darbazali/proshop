'use strict'
console.clear()
global.log = console.log

import express from 'express'
import colors from 'colors'

import { config } from 'dotenv'

import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

connectDB()

const app = express()
config() // dotenv
const { PORT, NODE_ENV } = process.env

app.get('/', (req, res) => {
    res.send('API is working..')
})

app.use('/api/products', productRoutes)

app.use(notFound)

app.use(errorHandler)

app.listen(
    PORT,
    log(`Server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold)
)
