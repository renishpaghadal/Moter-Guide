import React from "react";
import { Razorpay } from "./Razorpay";

export const BankComponent = ({ onDeposit }) => {
  const fixedAmount = 20000;

  const depositHandler = () => {
    onDeposit(fixedAmount);
  };

  const handlePaymentSuccess = () => {
    console.log("Payment successful");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-800 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 max-w-md w-full p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Book Your Car Now
        </h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            TOKEN AMOUNT TO PAY (₹)
          </label>

          {/* Razorpay Button Styled to Match */}
          <div className="w-full">
            <Razorpay amount={fixedAmount} onPaymentSuccess={handlePaymentSuccess} />
          </div>
        </div>
      </div>
    </div>
  );
};
