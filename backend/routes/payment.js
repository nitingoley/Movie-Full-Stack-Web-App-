import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
const router = express.Router();
import {
  cancelSubscription,
  createCheckoutSession,
  getDummySubscription,
  getSubscription,
  updateSubscription,
} from "../controller/payment.controller.js";

router.post("/cancel-subscription",    cancelSubscription);
router.post("/success-subscription",  updateSubscription);
router.get("/subscription-status", authenticate ,  getSubscription);
router.get("/subscription-status-dummy", authenticate ,  getDummySubscription);
// Route to handle subscription checkout
router.post("/create-session", authenticate, createCheckoutSession);
export default router;
