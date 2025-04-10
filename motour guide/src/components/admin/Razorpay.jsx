import React from "react";

export const Razorpay = ({ amount, onPaymentSuccess }) => {
  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      const options = {
        key: "rzp_test_26QypB3rHZrlZL", // Replace with your real Razorpay key
        amount: amount * 100, // Amount in paisa
        currency: "INR",
        name: "Car Booking",
        description: "Booking Token Payment",
        handler: function (response) {
          console.log("Razorpay Response", response);
          onPaymentSuccess();
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
        },
        theme: {
          color: "#0ea5e9",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    };
    document.body.appendChild(script);
  };

  return (
    <button
      onClick={loadRazorpay}
      className="w-full mt-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg border border-cyan-400/40 hover:shadow-[0_0_15px_#22d3ee] transition"
    >
      Pay ₹{amount}
    </button>
  );
};
