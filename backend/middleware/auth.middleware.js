import jwt from "jsonwebtoken";
import User from "../model/User.js";
import asyncHandler from "./asyncHandler.js";

// check user auth or not 
const authenticate = asyncHandler(async(req, res , next)=>{
    let token;


    // read the jwt from jwt cookie /

    token = req.cookies.jwt;
    
    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select("-password");
            next();
        } catch (error) {
            res.status(401)
            throw new Error("Unauthorized access !")
        }
    }else {
        res.status(401)
        throw new Error("Unauthorized access !")
    }
})

// check admin or not 
const isAdminCheck = (req , res , next)=>{
    if(req.user && req.user.isAdmin) {
        next();
    }else {
        res.status(401)
        throw new Error("Unauthorized user not an admin")
    }
}

export {authenticate , isAdminCheck};