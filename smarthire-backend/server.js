const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");



const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes.js");
const dashboardRoutes = require("./routes/dashboardRoutes.js");
const applicationRoutes = require("./routes/applicationRoutes.js");

const app = express();

app.use(cors());

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
})