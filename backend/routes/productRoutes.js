import express from 'express'
import productCtrl from '../controllers/productControllers.js'
const router = express.Router()

router.route('/').get(productCtrl.getProducts)
router.route('/:id').get(productCtrl.getProductById)

export default router
