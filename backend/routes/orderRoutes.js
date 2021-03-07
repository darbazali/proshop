import express from 'express'
import { addOrderItems } from '../controllers/orderControllers.js'
import protect from '../lib/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems)

export default router
