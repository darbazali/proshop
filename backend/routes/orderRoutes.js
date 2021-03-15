import express from 'express'
import orderCtrl from '../controllers/orderController.js'
import { protect } from '../lib/authMiddleware.js'
const router = express.Router()

router.route('/').post(protect, orderCtrl.addOrderItems)

export default router
