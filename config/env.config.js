import dotenv from "dotenv";
dotenv.config();

const { PORT, DB_URL, JWT_SECRET } = process.env;

const envConfig = {
  PORT: PORT || 8000,
  DB_URL: DB_URL || "mongodb://0.0.0.0:27017/HotelBooking",
  JWT_SECRET,
};

export default envConfig;
