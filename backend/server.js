import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"; // Import MongoDB connection file
import authRoutes from "./routes/authRoutes.js"; // Fix import

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" })); // Adjust for Vite frontend

// Routes
app.use("/auth", authRoutes); // Fix route handler

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
