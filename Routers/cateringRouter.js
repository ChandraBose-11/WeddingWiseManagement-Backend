import {
  bookCatering,
  createCatering,
  deleteCatering,
  getAllCatering,
  getByIdCatering,
} from "../Controllers/cateringController.js";
import { verifyToken } from "../Middleware/verifyToken.js";
import express from "express";

const router = express.Router();

router.post("/createcatering", verifyToken, createCatering);
router.get("/getcratering", getAllCatering);
router.post("/book/:id",verifyToken, bookCatering);
export default router;
