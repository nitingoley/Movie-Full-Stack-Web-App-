import jwt from "jsonwebtoken";
import User from "../model/User.js";
import asyncHandler from "./asyncHandler.js";

// Check if the user is authenticated
const authenticate = asyncHandler(async (req, res, next) => {
    let token;

    // Read the jwt from the cookie
    token = req.cookies.jwt;
    
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select("-password");
            console.log("User authenticated:", req.user);  
            next();
        } catch (error) {
            console.error("Error during token verification:", error.message);
            res.status(401).json({ error: "Unauthorized access! Invalid or expired token." });
        }
    } else {
        console.error("No token found in cookies");
        res.status(401).json({ error: "Unauthorized access! Token not found." });
    }
});

// Check if the user is an admin
const isAdminCheck = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        console.error("User is not an admin:", req.user ? req.user : "No user found");
        res.status(403).json({ error: "Unauthorized access! User is not an admin." });
    }
};

export { authenticate, isAdminCheck };
