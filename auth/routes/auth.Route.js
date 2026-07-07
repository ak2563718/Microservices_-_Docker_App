import express from 'express';
import { authLogin, authLogout, authRegister, authSession } from '../controllers/auth.Controller.js';
const router = express.Router();
router.post('/createuser',authRegister);
router.post('/login',authLogin);
router.get('/logout',authLogout);
router.get('/check-session',authSession)

export default router;