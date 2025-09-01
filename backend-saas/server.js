require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const AuthRoutes = require("./routes/AuthRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend adresin
    credentials: true, // 👈 cookie veya auth header kabul edilsin
  })
);
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", AuthRoutes);

// server.js veya app.js içinde
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error", error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
