import stripe from "stripe";
import User from "../model/User.js";
import dotenv from "dotenv";
dotenv.config();

// Use the secret key from environment variables for security
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

// Create Stripe Checkout Session
export const createCheckoutSession = async (req, res) => {
  try {
    console.log("Creating Stripe Checkout Session...");

    // Check if price ID is available in environment variables
    if (!process.env.STRIPE_PRICE_ID) {
      return res
        .status(400)
        .json({
          error: "Stripe price ID not configured in environment variables",
        });
    }

    // Create a session
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: "https://movie-full-stack-web-app-tud2.vercel.app/success",
      cancel_url: "https://movie-full-stack-web-app-tud2.vercel.app/cancel",
    });

    // Return session ID
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("❌ Error creating Stripe session:", error.message);
    res
      .status(500)
      .json({
        error: "Failed to create checkout session",
        details: error.message,
      });
  }
};

// Cancel Subscription
export const cancelSubscription = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User not authenticated" });
    }

    const user = await User.findById(req.user.id);

    // Check if user and subscriptionId exist
    if (!user || !user.subscriptionId) {
      return res
        .status(400)
        .json({ error: "No active subscription found for the user" });
    }

    console.log(
      `Canceling subscription for user: ${req.user.id} with subscription ID: ${user.subscriptionId}`
    );

    // Delete the subscription via Stripe API
    await stripeInstance.subscriptions.del(user.subscriptionId);

    // Update user subscription data in your DB
    user.subscriptionId = null;
    user.subscriptionStatus = "canceled";
    user.subscriptionExpiry = null;
    await user.save();

    // Return response
    res.json({ message: "Subscription canceled successfully" });
  } catch (error) {
    console.error("❌ Error canceling subscription:", error.message);
    res
      .status(500)
      .json({ error: "Failed to cancel subscription", details: error.message });
  }
};

// Upgrade/Downgrade Subscription
export const updateSubscription = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User not authenticated" });
    }

    const { newPriceId } = req.body;

    // Validate newPriceId
    if (!newPriceId || typeof newPriceId !== "string") {
      return res.status(400).json({ error: "Invalid price ID" });
    }

    const user = await User.findById(req.user.id);

    if (!user || !user.subscriptionId) {
      return res.status(400).json({ error: "No active subscription found" });
    }

    // Update the subscription with a new pricing plan
    const updatedSubscription = await stripeInstance.subscriptions.update(
      user.subscriptionId,
      {
        items: [{ price: newPriceId }], // Pass the new price ID for upgrade/downgrade
      }
    );

    res.json({
      message: "Subscription updated successfully",
      subscription: updatedSubscription,
    });
  } catch (error) {
    console.error("❌ Error updating subscription:", error.message);
    res
      .status(500)
      .json({ error: "Subscription update failed", details: error.message });
  }
};

// Get Subscription
export const getSubscription = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User not authenticated" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user's subscription status
    const subscriptionStatus =
      user.subscriptionStatus || "No active subscription";
    res.json({ subscriptionStatus });
  } catch (error) {
    console.error("❌ Error fetching subscription:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch subscription", details: error.message });
  }
};

// dummy data

// Get Subscription Details
export const getDummySubscription = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User not authenticated" });
    }

    // Find the user in the database
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch subscription status
    const subscriptionStatus =
      user.subscriptionStatus || "No active subscription";

    // Fetch subscription history (mock data for now)
    const subscriptionHistory = [
      {
        id: 1,
        status: "Active",
        startDate: "2023-10-01",
        endDate: "2023-10-31",
        price: "₹499",
      },
      {
        id: 2,
        status: "Expired",
        startDate: "2023-09-01",
        endDate: "2023-09-30",
        price: "₹499",
      },
    ];

    // Fetch current price (mock data for now)
    const price = "₹499";

    // Return all subscription details
    res.json({
      subscriptionStatus,
      subscriptionHistory,
      price,
    });
  } catch (error) {
    console.error("❌ Error fetching subscription:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch subscription", details: error.message });
  }
};
