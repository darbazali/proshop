import express from 'express'
import userCtrl from '../controllers/userControllers.js'
import { protect } from '../lib/authMiddleware.js'

const router = express.Router()

router.route('/').post(userCtrl.registerUser)

router
  .route('/profile')
  .get(protect, userCtrl.getUserProfile)
  .put(protect, userCtrl.updateUserProfile)

router.route('/login').post(userCtrl.authUser)

export default router
