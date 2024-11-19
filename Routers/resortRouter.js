
import { bookResort, createResort, getAllResorts } from '../Controllers/resortContoller.js';
import { authUser } from '../Middleware/authMiddleware.js';
import express from 'express';

const router = express.Router();

router.post('/createresort',authUser,createResort)
router.get('/get',getAllResorts)
router.post('/book/:id',authUser,bookResort)



export default router;