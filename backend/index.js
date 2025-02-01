import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoutes.js";
import genreRoute from "./routes/genreRoute.js";
import movieRoute from "./routes/movieRoute.js";
import uploadRoutes from "./routes/uploadRoute.js";
import paymentRoute from "./routes/payment.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "https://movie-full-stack-web-app-tud2.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

// Static Files
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/genre", genreRoute);
app.use("/api/v1/movies", movieRoute);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/payment", paymentRoute);

// Static Folder for Uploads
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/health", (req, res) => {
  res.send("Hello just for testing");
});

app.get("/working", (req, res) => {
  res.json({ message: "WOrking" });
});

// Start Server
const port = process.env.PORT || 6000;
app.listen(port, () => {
  connectDB();
  console.log(`Server running on http://localhost:${port}`);
});
