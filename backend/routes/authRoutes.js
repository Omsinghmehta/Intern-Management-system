import express from 'express'
import { register, login ,getInterns } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get("/interns", protect, getInterns);

export default router;