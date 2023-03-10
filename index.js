import express from "express";
import envConfig from "./config/env.config.js";
import { connectDB } from "./config/db.connect.js";

// Routes imported
import authRoute from "./routes/auth.routes.js";
import hotelsRoute from "./routes/hotels.routes.js";
import roomsRoute from "./routes/rooms.routes.js";
import usersRoute from "./routes/users.routes.js";
const corsOptions = {
  origin: true,
  credentials: true,
};
const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
const version = "v1";

/**
 * middlewares
 */
import cors from "cors";
import cookieParser from "cookie-parser";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(`/api/${version}/auth`, authRoute);
app.use(`/api/${version}/users`, usersRoute);
app.use(`/api/${version}/hotels`, hotelsRoute);
app.use(`/api/${version}/rooms`, roomsRoute);
app.get("/", (req, res) => {
  res.status(200).json({ message: "Namaste" });
});
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

connectDB().then(() => {
  app.listen(envConfig.PORT, () => {
    console.log("listening for requests");
  });
});
