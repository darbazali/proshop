import express from 'express'
import userCtrl from '../controllers/userController.js'
import protect from '../lib/authMiddleware.js'

const router = express.Router()
router.route('/').get(userCtrl.getUsers).post(userCtrl.registerUser)
router.post('/login', userCtrl.authUser)
router.get('/profile', protect, userCtrl.getUserProfile)

export default router
