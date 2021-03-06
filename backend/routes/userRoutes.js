import express from 'express'
import userCtrl from '../controllers/userController.js'
import protect from '../lib/authMiddleware.js'

const router = express.Router()
router.route('/').get(userCtrl.getUsers).post(userCtrl.registerUser)
router.post('/login', userCtrl.authUser)
router
  .route('/profile')
  .get(protect, userCtrl.getUserProfile)
  .put(protect, userCtrl.updateUserProfile)

export default router
