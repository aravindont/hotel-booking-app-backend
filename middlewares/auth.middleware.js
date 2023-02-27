import jwt from "jsonwebtoken";
import { customError } from "../utils/customError.js";
import envConfig from "../config/env.config.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(customError(401, "you are not authenticated!!"));
  }
  jwt.verify(token, envConfig.JWT_SECRET, (err, user) => {
    if (err) return next(customError(403, "Token is not valid!"));
    console.log(req.user);
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userId === req.params.userId || req.user.isAdmin) {
      next();
    } else {
      return next(customError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user) {
      return next(customError(403, "You are not authorized!"));
    }
    if (req.user.isAdmin) {
      next();
    } else {
      return next(customError(403, "You are not authorized!"));
    }
  });
};
