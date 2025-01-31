import React from "react";
import { useNavigate } from "react-router-dom";

export default function Cancel() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-gray-800">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center max-w-md">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Payment Canceled
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          It looks like the payment process was canceled. No charges have been
          made.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-red-500 hover:bg-red-600 text-white w-full rounded-lg text-2xl py-2"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
}
