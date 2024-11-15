
import { createResort, getAllResorts } from '../Controllers/resortContoller.js';
import {verifyToken} from '../Middleware/verifyToken.js'
import express from 'express';

const router = express.Router();

router.post('/createresort',verifyToken,createResort)
router.get('/get',getAllResorts)




export default router