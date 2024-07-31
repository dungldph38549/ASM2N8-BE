import cors from "cors";
import express from "express";
import router from "./src/routes/index.js";
import connectdb from "./src/utils/connectDB.js";
import { errorCommon, errorNotFound } from "./src/utils/handleError.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const { PORT, DB_URI } = process.env;

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017")
  .then(console.log("connected db "))
  .catch((err) => console.log(err))
  // Connect to MongoDB
  .connectdb(DB_URI);

app.use("/api", router);

// Error handler
app.use(errorNotFound, errorCommon);

app.listen(PORT || 8000, () => {
  console.log(`Server is running on port ${PORT || 8000}`);
});
