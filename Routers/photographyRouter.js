import { bookPhotography, CreatePhotography, getAllPhotography } from "../Controllers/photographyController.js";
import { verifyToken } from "../Middleware/verifyToken.js";
import express from "express";

const router = express.Router();

router.post('/createphoto',verifyToken,CreatePhotography)
router.get('/get',getAllPhotography)
router.post("/book/:id",verifyToken, bookPhotography);

export default router;