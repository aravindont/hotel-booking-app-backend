import express from "express";
import cors from "cors";
import { connectToDB } from "./config/db.connect.js";
connectToDB();
import envConfig from "./config/env.config.js";

// Routes imported
import authRoute from "./routes/auth.js";

const app = express();

const version = "v1";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(`/api/${version}`, authRoute);

app.listen(envConfig.PORT, () => {
  console.log(`server started on http://localhost:${envConfig.PORT}`);
});
