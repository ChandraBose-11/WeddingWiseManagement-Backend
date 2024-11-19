import { bookPhotography, CreatePhotography, getAllPhotography } from "../Controllers/photographyController.js";
import { authUser } from "../Middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

router.post('/createphoto',authUser,CreatePhotography)
router.get('/get',getAllPhotography)
router.post("/book/:id",authUser, bookPhotography);

export default router;