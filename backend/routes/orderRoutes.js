import express from 'express'
import orderCtrl from '../controllers/orderControllers.js'
import { protect } from '../lib/authMiddleware.js'
const router = express.Router()

router.route('/').post(protect, orderCtrl.addOrderItems)
router.route('/myorders').get(protect, orderCtrl.getMyOrders)
router.route('/:id').get(protect, orderCtrl.getOrderById)
router.route('/:id/pay').put(orderCtrl.updateOrderToPaid)

export default router
