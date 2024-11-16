import {
  createCatering,
  getAllCatering,
} from "../Controllers/cateringController.js";
import { verifyToken } from "../Middleware/verifyToken.js";
import express from "express";

const router = express.Router();

router.post("/createcatering", verifyToken, createCatering);
router.get("/getcratering", getAllCatering);
export default router;
