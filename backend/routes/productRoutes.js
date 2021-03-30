import express from 'express'
import productCtrl from '../controllers/productControllers.js'
import { protect, admin } from '../lib/authMiddleware.js'
const router = express.Router()

router.route('/').get(productCtrl.getProducts)

router
  .route('/:id')
  .get(productCtrl.getProductByID)
  .delete(protect, admin, productCtrl.deleteProduct)

export default router
