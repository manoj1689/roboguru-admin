"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { verifyOtp } from "../../redux/slices/authslice"; // Assuming this is the action

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const mobile = new URLSearchParams(window.location.search).get("mobile_number");

  // Get loading and error states from Redux store
  const { loading, error, token } = useSelector((state: RootState) => state.auth);
 
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Dispatch verifyOtp action
      console.log("mobile number",mobile,otp)
      const resultAction = await dispatch(verifyOtp({ mobile: mobile!, otp }));

      if (verifyOtp.fulfilled.match(resultAction)) {
        // On successful OTP verification, redirect to admin panel
        router.push("/admin");
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Verify OTP</h1>
        <form onSubmit={handleVerifyOTP}>
          <label className="block text-sm font-bold mb-2">Enter OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg mb-4"
            placeholder="Enter OTP"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            disabled={loading || !otp}
          >
            {loading ? "Verifying OTP..." : "Verify OTP"}
          </button>
          {token && (
            <p className="text-green-500 mt-4">
              OTP verified successfully! You will be redirected shortly.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
