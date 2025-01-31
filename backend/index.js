import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoutes.js";
import genreRoute from "./routes/genreRoute.js";
import movieRoute from "./routes/movieRoute.js";
import uploadRoutes from "./routes/uploadRoute.js";
import paymentRoute from   "./routes/payment.js";
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
  origin: 'http://localhost:5173', 
  credentials: true,  
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

// Frontend Handling
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// any request redirect index.html page
app.use("*", (req, res) => {
 res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});


app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'origin-when-cross-origin');
  next();
});

// Start Server
const port = process.env.POST || 8000;
app.listen(port, () => {
    connectDB();
    console.log(`Server running on http://localhost:${port}`);
});
