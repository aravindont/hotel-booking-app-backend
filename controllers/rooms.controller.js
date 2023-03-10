import Room from "../models/room.schema.js";
import Hotel from "../models/hotel.schema.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.roomId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const roomId = req.params.roomId;
  try {
    console.log("in ");
    await Room.findByIdAndDelete(roomId);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: roomId },
      });
      res.status(200).json("Room has been deleted.");
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

export const getSingleRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.roomId);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.roomNumberId },
      { $push: { "roomNumbers.$.unavailableDates": req.body.dates } }
    ),
      res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};
