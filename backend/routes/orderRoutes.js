import express from 'express'
import orderCtrl from '../controllers/orderController.js'
import protect from '../lib/authMiddleware.js'
const router = express.Router()

router.route('/').post(protect, orderCtrl.addOrderItems)
router.route('/:id').get(protect, orderCtrl.getOrderById)
router.route('/:id/pay').put(protect, orderCtrl.updateOrderToPaid)

export default router
