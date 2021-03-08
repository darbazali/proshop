import express from 'express'
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getOrders,
} from '../controllers/orderControllers.js'
import { protect, admin } from '../lib/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router
