import { bookDecor, createDecor, getAllDecor } from "../Controllers/decorationController.js";
import { authUser } from "../Middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/createdecor",authUser,createDecor);
router.get("/getdecor",getAllDecor)
router.post("/book/:id",authUser,bookDecor);

export default router;