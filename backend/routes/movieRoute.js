import { authenticate, isAdminCheck } from "../middleware/auth.middleware.js";
import express from "express";
const router = express.Router();
import isCheckId from "../middleware/isCheckId.js";
import {
  createMovie,
  DeleteComment,
  deleteMovie,
  getAllMovies,
  getNewMovies,
  getRandomMovies,
  getSpificMovie,
  getTopMovie,
  getUpdateMovie,
  MovieReview,
} from "../controller/movie.controller.js";

// public  routes
router.route("/all-movies").get(getAllMovies);
router.route("/specific-movie/:id").get(getSpificMovie);
router.route("/get-lastest").get(getNewMovies);
router.route("/top-movies").get(getTopMovie);
router.route("/random-movies").get(getRandomMovies);

// restricted
router.route("/:id/reviews").post(authenticate, isCheckId, MovieReview);

// admin only operation
router.route("/create-movie").post(authenticate, isAdminCheck, createMovie);

router
  .route("/update-movie/:id")
  .put(authenticate, isAdminCheck, getUpdateMovie);
router
  .route("/delete-movie/:id")
  .delete(authenticate, isAdminCheck, deleteMovie);
router
  .route("/delete-comment")
  .delete(authenticate, isAdminCheck, DeleteComment);

export default router;
