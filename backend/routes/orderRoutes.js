import express from 'express'
import { addOrderItems, getOrderById } from '../controllers/orderControllers.js'
import protect from '../lib/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)

export default router
