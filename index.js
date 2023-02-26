import express from "express";
// import { connectToDB } from "./config/db.connect.js";
// connectToDB();
import mongoose from "mongoose";
mongoose.set("strictQuery", false);
// mongoose.set("bufferCommands", false);
// export const connectToDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URL);

//     console.log(`connected to ${conn.connection.name}`);
//   } catch (err) {
//     console.log(err.message);
//   }
// };

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);

    console.info(`Connected to database on ${conn.connection.name}`);
  } catch (error) {
    console.error(
      `Connection error: ${error.stack} on Worker process: ${process.pid}`
    );
    process.exit(1);
  }
};
connectDb();
import cors from "cors";
import envConfig from "./config/env.config.js";
import cookieParser from "cookie-parser";
// Routes imported
import authRoute from "./routes/auth.routes.js";
import hotelsRoute from "./routes/hotels.routes.js";
import roomsRoute from "./routes/rooms.routes.js";
import usersRoute from "./routes/users.routes.js";

const app = express();

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
