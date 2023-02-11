import express from "express";
import {
  createHotel,
  deleteHotel,
  getAllHotels,
  getSingleHotel,
  updateHotel,
} from "../controllers/hotels.controller.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";
const router = express.Router();

// CREATE
router.post("/create", verifyAdmin, createHotel);
// UPDATE
router.put("/update/:hotelId", verifyAdmin, updateHotel);
// DELETE
router.delete("/remove/:hotelId", verifyAdmin, deleteHotel);
// GET
router.get("/get/:hotelId", getSingleHotel);
// GET ALL
router.get("/get-all", getAllHotels);
export default router;
