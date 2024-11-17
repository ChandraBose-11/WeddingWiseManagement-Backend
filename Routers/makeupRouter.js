import { createMakeup, getAllMakeup } from "../Controllers/makeupController.js";
import { verifyToken } from "../Middleware/verifyToken.js";
import express from "express";

const router = express.Router();

router.post("/createmakeup",verifyToken,createMakeup)
router.get("/getmakeup",getAllMakeup)

export default router;