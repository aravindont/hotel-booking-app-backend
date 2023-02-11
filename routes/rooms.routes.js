import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getSingleRoom,
  updateRoom,
} from "../controllers/rooms.controller.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// CREATE
router.post("/create/:hotelId", verifyAdmin, createRoom);
// UPDATE
router.put("/update/:roomId", verifyAdmin, updateRoom);
// DELETE
router.delete("/remove/:hotelId", verifyAdmin, deleteRoom);
// GET
router.get("/get/:roomId", getSingleRoom);
// GET ALL
router.get("/get-all-rooms", getAllRooms);
export default router;
