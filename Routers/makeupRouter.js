import { bookMakeup, createMakeup, getAllMakeup } from "../Controllers/makeupController.js";
import { authUser } from "../Middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/createmakeup",authUser,createMakeup)
router.get("/getmakeup",getAllMakeup)
router.post("/book/:id",authUser,bookMakeup);
export default router;