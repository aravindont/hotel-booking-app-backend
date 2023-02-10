import express from "express";
import {
  createHotel,
  deleteHotel,
  getAllHotels,
  getSingleHotel,
  updateHotel,
} from "../controllers/hotels.controller.js";
const router = express.Router();

// CREATE
router.post("/create", createHotel);
// UPDATE
router.put("/update/:hotelId", updateHotel);
// DELETE
router.delete("/remove/:hotelId", deleteHotel);
// GET
router.get("/get/:hotelId", getSingleHotel);
// GET ALL
router.get("/get-all", getAllHotels);
export default router;
