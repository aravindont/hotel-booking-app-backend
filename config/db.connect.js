import mongoose from "mongoose";
mongoose.set("strictQuery", false);
export const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (conn) {
      console.log(`connected to ${conn.connection.name}`);
    }
  } catch (err) {
    console.log(err.message);
  }
};
