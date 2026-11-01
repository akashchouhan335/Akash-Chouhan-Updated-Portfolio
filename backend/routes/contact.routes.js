import { Router } from 'express'
import rateLimit from '../middleware/rateLimit.js'
import validateContact from '../middleware/validateContact.js'
import { handleContact } from '../controllers/contact.controller.js'

const router = Router()

// POST /api/contact
router.post('/contact', rateLimit, validateContact, handleContact)

export default router
