import express from "express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "../controllers/users.controller.js";
import {
  verifyAdmin,
  verifyToken,
  verifyUser,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// router.get("/checkAuthentication", verifyToken, (req, res, next) => {
//   res.send("hello user,you are logged in");
// });

// router.get("/checkuser/:userId", verifyUser, (req, res, next) => {
//   res.send("hello user, you are logged in and you can delete your account");
// });

// router.get("/checkadmin/:userId", verifyAdmin, (req, res, next) => {
//   res.send("hello admin, you are logged in and you can delete all accounts");
// });
// UPDATE
router.put("/update/:userId", verifyUser, updateUser);
// DELETE
router.delete("/remove/:userId", verifyUser, deleteUser);
// GET
router.get("/get/:userId", verifyUser, getSingleUser);
// GET ALL
router.get("/getAllUsers", verifyAdmin, getAllUsers);
export default router;
