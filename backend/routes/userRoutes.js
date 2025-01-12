import express from "express";
import {
  createUser,
  currentUser,
  getAllUsers,
  loginUser,
  logout,
  updateCurrentUser,
} from "../controller/user.controller.js";
import { authenticate, isAdminCheck } from "../middleware/auth.middleware.js";
const router = express.Router();

router.route("/").post(createUser);
router.route("/auth").post(loginUser);
router.route("/logout").post(logout);
router.route("/").get(authenticate, isAdminCheck, getAllUsers);
router.route("/profile").get(authenticate, currentUser);
router.route("/profile").put(authenticate, updateCurrentUser);


export default router;
