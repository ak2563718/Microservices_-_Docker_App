import express from 'express';
import { createCourse, deleteCourse, getCourse, getCoursebyId, updateCourse } from '../controllers/course.Controller.js';
const router = express.Router();
router.post('/createcourse',createCourse)
router.get('/getcourse',getCourse)
router.get('/course/:id',getCoursebyId)
router.patch('/updatecourse/:id',updateCourse)
router.delete('/deletecourse/:id',deleteCourse)

export default router;