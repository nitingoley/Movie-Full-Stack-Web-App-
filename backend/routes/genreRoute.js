import express from "express";
const router = express.Router();
import { authenticate, isAdminCheck } from "../middleware/auth.middleware.js";
import {
  allGenres,
  genreCreate,
  genreRemove,
  genreUpdate,
  readGenre,
} from "../controller/genre.controller.js";

router.route("/").post(authenticate, isAdminCheck, genreCreate);
router.route("/:id").put(authenticate, isAdminCheck, genreUpdate);
router.route("/:id").delete(authenticate, isAdminCheck, genreRemove);
router.route("/all-genres").get(allGenres);
router.route("/:id").get(readGenre);

export default router;
