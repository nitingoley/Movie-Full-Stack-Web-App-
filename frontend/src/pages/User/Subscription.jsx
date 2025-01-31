import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  ArrowUpCircle,
  Loader,
  Clock,
  Calendar,
} from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PSEXn06AQVECNmWRdEcjGQlQrNJAl3rYoZgY4masULx8v8gusoShdagWO81UEmDEJ0oDh2vEUh1VY2BGSi35jUE00sw3eyFEE"
);
const url = "https://movie-full-stack-backend.onrender.com";

export default function Subscription() {
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [subscriptionHistory, setSubscriptionHistory] = useState([]); 
  const [price, setPrice] = useState("₹499"); 

  // Fetch subscription status and history
  useEffect(() => {
    // const fetchSubscriptionData = async () => {
    //   setLoading(true);
    //   try {
    //     // Fetch subscription status
    //     const statusResponse = await fetch(`${url}/api/v1/payment/subscription-status-dummy`, {
    //       method: "GET",
    //       credentials: "include",
    //     });

    //     if (!statusResponse.ok) throw new Error("Failed to fetch subscription status");
    //     const statusData = await statusResponse.json();
    //     setSubscriptionStatus(statusData.status);

    //     // Fetch subscription history
    //     const historyResponse = await fetch(`${url}/api/v1/payment/subscription-history`, {
    //       method: "GET",
    //       credentials: "include",
    //     });

    //     if (!historyResponse.ok) throw new Error("Failed to fetch subscription history");
    //     const historyData = await historyResponse.json();
    //     setSubscriptionHistory(historyData.history);

    //     // Fetch price
    //     const priceResponse = await fetch(`${url}/api/v1/payment/subscription-status`, {
    //       method: "GET",
    //       credentials: "include",
    //     });

    //     if (!priceResponse.ok) throw new Error("Failed to fetch price");
    //     const priceData = await priceResponse.json();
    //     setPrice(priceData.price);
    //   } catch (error) {
    //     console.error("Error fetching subscription data:", error.message);
    //     setError("Failed to fetch subscription data. Please try again.");
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    const fetchSubscriptionData = async () => {
      try {
        const response = await fetch(
          "https://movie-full-stack-backend.onrender.com/api/v1/payment/subscription-status-dummy",
          {
            method: "GET",
            credentials: "include", // ✅ Ensures JWT cookie is sent
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("Response Status:", response.status); 

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Subscription Fetch Error:", errorData);
          throw new Error(
            errorData.error || "Failed to fetch subscription status"
          );
        }

        const data = await response.json();
        console.log("Subscription status:", data);
      } catch (error) {
        console.error("Error fetching subscription status:", error.message);
      }
    };
    fetchSubscriptionData();
  }, []);

  const handleCancelSubscription = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${url}/api/v1/payment/cancel-subscription`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error("Error cancelling subscription");
      }
      setSubscriptionStatus("Canceled");
    } catch (error) {
      setError("Error canceling subscription");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubscription = async (newPriceId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${url}/api/v1/payment/update-subscription`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPriceId }),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating subscription");
      }

      const data = await response.json();
      setSubscriptionStatus(data.subscriptionStatus);
    } catch (error) {
      console.error(error.message);
      setError("Error updating subscription");
    } finally {
      setLoading(false);
    }
  };

  const handleStripeCheckout = async () => {
    const stripe = await stripePromise;
    setLoading(true);
    try {
      const response = await fetch(`${url}/api/v1/payment/create-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to initiate checkout session");
      }

      const { sessionId } = await response.json();

      if (!sessionId) {
        setError("Session ID is missing");
        return;
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("❌ Error during Stripe checkout:", error.message);
        setError("Failed to initiate checkout. Please try again.");
      }
    } catch (err) {
      console.error("❌ Error initiating Stripe checkout:", err.message);
      setError("Error initiating Stripe checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Subscription Dashboard
        </h2>

        {/* Subscription Status */}
        <div className="mb-8">
          {loading && (
            <div className="flex justify-center items-center space-x-2">
              <Loader className="w-6 h-6 animate-spin text-blue-500" />
              <span className="text-gray-600">Loading...</span>
            </div>
          )}
          {error && (
            <div className="text-center text-red-600 mb-4">{error}</div>
          )}

          {subscriptionStatus && (
            <div className="flex justify-center">
              <div
                className={`px-6 py-3 rounded-full font-semibold text-lg flex items-center space-x-2 ${
                  subscriptionStatus === "Active"
                    ? "bg-green-100 text-green-700"
                    : subscriptionStatus === "Canceled"
                    ? "bg-red-100 text-red-700"
                    : subscriptionStatus === "Expired"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {subscriptionStatus === "Active" && (
                  <CheckCircle className="w-6 h-6" />
                )}
                {subscriptionStatus === "Canceled" && (
                  <XCircle className="w-6 h-6" />
                )}
                {subscriptionStatus === "Expired" && (
                  <ArrowUpCircle className="w-6 h-6" />
                )}
                <span>{subscriptionStatus}</span>
              </div>
            </div>
          )}
        </div>

        {/* Price Display */}
        <div className="text-center mb-8">
          <p className="text-2xl font-semibold text-gray-800">
            Current Plan: <span className="text-blue-600">{price}</span> / month
          </p>
        </div>

        {/* Subscription History */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Subscription History
          </h3>
          {subscriptionHistory.length > 0 ? (
            <div className="space-y-4">
              {subscriptionHistory.map((subscription) => (
                <div
                  key={subscription.id}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm flex justify-between items-center"
                >
                  <div className="flex items-center space-x-4">
                    <Calendar className="w-6 h-6 text-gray-500" />
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {subscription.status} - {subscription.price}
                      </p>
                      <p className="text-sm text-gray-500">
                        {subscription.startDate} to {subscription.endDate}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      subscription.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : subscription.status === "Canceled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {subscription.status}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No subscription history found.
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => handleUpdateSubscription("new_price_id")}
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            title="Upgrade your subscription plan"
          >
            <ArrowUpCircle className="w-6 h-6" />
            <span>Upgrade Plan</span>
          </button>

          <button
            onClick={handleCancelSubscription}
            className="bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            title="Cancel your subscription"
          >
            <XCircle className="w-6 h-6" />
            <span>Cancel Subscription</span>
          </button>

          <button
            onClick={handleStripeCheckout}
            className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <CheckCircle className="w-6 h-6" />
            <span>Pay Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
