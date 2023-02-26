import express from "express";
import cors from "cors";
import { connectToDB } from "./config/db.connect.js";
import envConfig from "./config/env.config.js";
import cookieParser from "cookie-parser";
// Routes imported
import authRoute from "./routes/auth.routes.js";
import hotelsRoute from "./routes/hotels.routes.js";
import roomsRoute from "./routes/rooms.routes.js";
import usersRoute from "./routes/users.routes.js";

const app = express();
connectToDB();
const version = "v1";

/**
 * middlewares
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
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
app.listen(envConfig.PORT, () => {
  console.log(`server started on http://localhost:${envConfig.PORT}`);
});
