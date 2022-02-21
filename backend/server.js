const express = require("express");
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const goalsRouter = require("./routes/goalRoutes");
const { connectDB } = require("./config/db");
const userRouter = require("./routes/userRoutes");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
connectDB();
const app = express();
app.use("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", "*");
  res.header("Access-Control-Allow-Methods", "*");

  next();
});
app.use(express.json());
app.use(errorHandler);
app.use("/api/goals", goalsRouter);
app.use("/api/user", userRouter);
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
