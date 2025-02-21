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

// Setup __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration
const allowedOrigins = [
  "https://movie-ui-teal.vercel.app",
  "https://moviefx.vercel.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

// Serve Static Files (Frontend Build in Production)
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/genre", genreRoute);
app.use("/api/v1/movies", movieRoute);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/payment", paymentRoute);

// Static Folder for Uploads
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Handling production build of frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Start Server
const port = process.env.PORT || 6000;
app.listen(port, () => {
  connectDB();
  console.log(`Server oasn the running on http://localhost:${port}`);
});
