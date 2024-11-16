import { CreatePhotography, getAllPhotography } from "../Controllers/photographyController.js";
import { verifyToken } from "../Middleware/verifyToken.js";
import express from "express";

const router = express.Router();

router.post('/createphoto',verifyToken,CreatePhotography)
router.get('/get',getAllPhotography)


export default router;