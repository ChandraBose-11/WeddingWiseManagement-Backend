import {
  bookCatering,
  createCatering,
  getAllCatering,
} from "../Controllers/cateringController.js";
import { authUser } from "../Middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/createcatering",authUser , createCatering);
router.get("/getcratering", getAllCatering);
router.post("/book/:id",authUser, bookCatering);
export default router;
