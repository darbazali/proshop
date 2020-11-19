import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

// custom modules
import productRoutes from './routes/productRoutes.js'
import userRoute from './routes/userRoute.js'
import { notFound, errorHandler } from './helpers/errorMiddleware.js'

// init app
const app = express()
dotenv.config()

// middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('API is working..')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoute)

app.use(notFound)

app.use(errorHandler)

export default app
