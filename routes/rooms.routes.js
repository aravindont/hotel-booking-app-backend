import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getSingleRoom,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/rooms.controller.js";
import { verifyAdmin, verifyUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

// CREATE
router.post("/create/:hotelId", verifyAdmin, createRoom);
// UPDATE
router.put("/update/:roomId", verifyAdmin, updateRoom);
// DELETE
router.delete("/remove/:roomId/:hotelId", verifyAdmin, deleteRoom);

// GET
router.get("/get/:roomId", verifyUser, getSingleRoom);
// GET ALL
router.get("/getAllRooms", verifyUser, getAllRooms);

router.put("/availability/:roomNumberId", verifyUser, updateRoomAvailability);
export default router;
