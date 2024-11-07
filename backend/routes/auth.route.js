import express from 'express'
import { login, logout, signup, verifyEmail, forgotpassword, resetpassword, checkAuth } from '../controller/auth.controller.js'
import { verifyTokken } from '../middleware/verification.js'
const router = express.Router()

router.get('/check-auth', verifyTokken, checkAuth)
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.post('/verify-email', verifyEmail)
router.post('/forgot', forgotpassword)
router.post('/reset-password/:token', resetpassword)
export default router;