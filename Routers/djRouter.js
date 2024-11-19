import { bookDJ, createDJ, getAllDJ } from "../Controllers/djController.js";
import { verifyToken } from "../Middleware/verifyToken.js";
import express from "express"

const router =express.Router();

router.post("/createdj",verifyToken,createDJ);
router.get("/getdj",getAllDJ)
router.post("/book/:id",verifyToken,bookDJ);

export default router