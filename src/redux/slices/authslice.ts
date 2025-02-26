import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/api";

// Initial state for authentication
interface AuthState {
  mobile: string | null;
  token: string | null;
  otpSent: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  mobile: null,
  token: null,
  otpSent: false,
  loading: false,
  error: null,
};

// Thunk for requesting OTP
export const login = createAsyncThunk(
  "auth/login",
  async (mobile: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/signin?mobile_number=${encodeURIComponent(mobile)}`);
      console.log("Login response:", response);
      return { mobile }; // Return mobile on success
    } catch (error: any) {
      console.error("Login error:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Thunk for verifying OTP and getting the token
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (
    { mobile, otp }: { mobile: string; otp: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `/verify_otp?mobile_number=${encodeURIComponent(mobile)}&otp=${encodeURIComponent(otp)}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Verify OTP response:", response.data);

      if (response.data?.access_token) {
        localStorage.setItem("admin_access_token", response.data.access_token);
      }

      return response.data; // Return token and other success data
    } catch (error: any) {
      console.error("Verify OTP error:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || "OTP verification failed");
    }
  }
);

// Thunk for super admin login
export const superAdminLogin = createAsyncThunk(
  "auth/admin/login",
  async (
    { mobile, otp }: { mobile: string; otp: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `/admin/login`, // Endpoint remains the same
        {
          // Passing mobile and otp in the request body
          mobile_number: mobile,
          otp: otp,
        },
        {
          headers: { "Content-Type": "application/json",
            "accept":"application/json"
           },
        }
      );

      console.log("Super Admin Login response:", response.data);

      if (response.data?.data.access_token) {
        localStorage.setItem("admin_access_token", response.data.data.access_token);
      }

      return response.data.data; // Return token and other success data
    } catch (error: any) {
      console.error("Super Admin Login error:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || "Super Admin login failed");
    }
  }
);


// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.mobile = null;
      state.token = null;
      state.otpSent = false;
      state.loading = false;
      state.error = null;

      // Remove token from localStorage when logging out
      localStorage.removeItem("admin_access_token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true; // Mark OTP as sent
        state.mobile = action.payload.mobile; // Store the mobile number
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle OTP verification
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access_token || null; // Store token if available
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle super admin login
      .addCase(superAdminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(superAdminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access_token || null; // Store token if available
      })
      .addCase(superAdminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
