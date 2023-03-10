import User from "../models/user.schema.js";
import bcrypt from "bcryptjs";
import { customError } from "../utils/customError.js";
import envConfig from "../config/env.config.js";
import jwt from "jsonwebtoken";
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(200).json("user has been created");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(customError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(customError(400, "Wrong password or username!"));
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      envConfig.JWT_SECRET
    );
    const { password, isAdmin, ...otherDetails } = user._doc;

    res.cookie("access_token", token, {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.status(200).json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
