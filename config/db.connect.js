import mongoose from "mongoose";
mongoose.set("strictQuery", false);
mongoose.set("bufferCommands", false);
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.name}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
