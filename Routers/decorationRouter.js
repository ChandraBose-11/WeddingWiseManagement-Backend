import { bookDecor, createDecor, getAllDecor } from "../Controllers/decorationController.js";
import { verifyToken } from "../Middleware/verifyToken.js";
import express from "express";

const router = express.Router();

router.post("/createdecor",verifyToken,createDecor);
router.get("/getdecor",getAllDecor)
router.post("/book/:id",verifyToken,bookDecor);

export default router;