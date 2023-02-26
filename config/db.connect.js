import mongoose from "mongoose";
mongoose.set("strictQuery", false);
// mongoose.set("bufferCommands", false);
export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (err) {
    console.log(err.message);
  }
};
