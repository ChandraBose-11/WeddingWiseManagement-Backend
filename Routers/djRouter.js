import { createDJ, getAllDJ } from "../Controllers/djController.js";
import { verifyToken } from "../Middleware/verifyToken.js";
import express from "express"

const router =express.Router();

router.post("/createdj",verifyToken,createDJ);
router.get("/getdj",getAllDJ)

export default router