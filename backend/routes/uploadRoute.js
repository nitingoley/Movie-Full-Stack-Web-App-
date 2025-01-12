// import path from "path";
// import express from "express";
// import multer from "multer";

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },

//   filename: (req, file, cb) => {
//     const extname = path.extname(file.originalname);
//     cb(null, `${file.fieldname}-${Date.now()}${extname}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const filetypes = /jpe?g|png|webp/;
//   const mimetypes = /image\/jpe?g|image\/png||image\/webp/;

//   const extname = path.extname(file.originalname);
//   const mimetype = file.mimetype;

//   if (filetypes.test(extname) && mimetypes.test(mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Images only"), false);
//   }
// };

// const upload = multer({ storage, fileFilter });
// const uploadSingleImage = upload.single("image");

// router.post("/", (req, res) => {
//   uploadSingleImage(req, res, (err) => {
//     if (err) {
//       res.status(400).send({ message: err.message });
//     } else if (req.file) {
//       res.status(200).send({
//         message: "Image uploaded successfully",
//         image: `/${req.file.path}`,
//       });
//     } else {
//       res.status(400).send({ message: "No image file provided" });
//     }
//   });
// });

// // export default router;


// second i just taste dynamic so i was used cloudinary for storing images 




import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import cloudinaryPkg from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

dotenv.config();

const router = express.Router();

// Cloudinary configuration
const { v2: cloudinary } = cloudinaryPkg;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads", // Replace with your desired folder name in Cloudinary
        allowed_formats: ["jpg", "jpeg", "png", "webp"], // Allowed image formats
    },
});

// Initialize multer with Cloudinary storage
const upload = multer({ storage });

// Middleware for single image upload
const uploadSingleImage = upload.single("image");

// Define route
router.post("/", (req, res) => {
    uploadSingleImage(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        if (req.file) {
            return res.status(200).json({
                message: "Image uploaded successfully",
                image: req.file.path, // This will be the Cloudinary URL
            });
        }
        return res.status(400).json({ message: "No image provided" });
    });
});

export default router;
