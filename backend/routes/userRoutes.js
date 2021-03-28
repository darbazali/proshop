import express from 'express'
import userCtrl from '../controllers/userControllers.js'
import { protect } from '../lib/authMiddleware.js'

const router = express.Router()
router.route('/').post(userCtrl.registerUser)
router.route('/:id').get(protect, userCtrl.getUserProfile)
router.route('/login').post(userCtrl.authUser)

export default router
