"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { login } from "../../redux/slices/authslice";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Get loading and error states from Redux store
  const { loading, error, otpSent } = useSelector((state: RootState) => state.auth);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Dispatch login action to send OTP
      const resultAction = await dispatch(login(mobile));

      if (login.fulfilled.match(resultAction)) {
        // Redirect to OTP verification page on success
        router.push(`/verify_otp?mobile_number=${mobile}`);
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Robo-Guru Admin Login</h1>
        <form onSubmit={handleSendOTP}>
          <label className="block text-sm font-bold mb-2">Mobile Number</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg mb-4"
            placeholder="Enter your mobile number"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            disabled={loading || !mobile}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
          {otpSent && (
            <p className="text-green-500 mt-4">
              OTP sent successfully! Please check your mobile.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
