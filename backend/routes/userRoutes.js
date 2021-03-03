import express from 'express'
import userCtrl from '../controllers/userController.js'

const router = express.Router()

router.post('/login', userCtrl.authUser)

export default router
