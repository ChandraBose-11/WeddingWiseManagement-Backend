import { bookDJ, createDJ, getAllDJ } from "../Controllers/djController.js";
import { authUser } from "../Middleware/authMiddleware.js";
import express from "express"

const router =express.Router();

router.post("/createdj",authUser,createDJ);
router.get("/getdj",getAllDJ)
router.post("/book/:id",authUser,bookDJ);

export default router