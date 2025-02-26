import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../redux/store"; // Adjust based on your store structure
import { superAdminLogin } from "../../redux/slices/authslice";

const SuperAdminLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mobile || !otp) {
      alert("Please fill in both mobile number and OTP.");
      return;
    }

    try {
      const result = await dispatch(superAdminLogin({ mobile, otp })).unwrap();

      if (result.access_token) {
        router.push("/admin"); // Redirect to the admin page on success
      }
    } catch (err) {
      console.error("Error logging in:", err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Super Admin Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="mobile">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobile"
              className="w-full px-4 py-2 border rounded"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter mobile number"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="otp">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              className="w-full px-4 py-2 border rounded"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Submit"}
          </button>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
