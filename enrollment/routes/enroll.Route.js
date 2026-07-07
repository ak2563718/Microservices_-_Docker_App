import express, { Router } from 'express';
import { enrollcourse, getMycourse } from '../controllers/enroll.Controller.js';
const router = express.Router();
router.post('/enrollcourse',enrollcourse)
router.get('/mycourse',getMycourse)

export default router