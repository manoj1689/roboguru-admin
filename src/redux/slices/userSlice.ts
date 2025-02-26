import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

// Define the async thunks
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('/users/read_users_users__get');
  return response.data;
});

export const createUser = createAsyncThunk('users/createUser', async (user: any) => {
  const response = await axios.post('/users/create_user_users__post', user);
  return response.data;
});

// Define the state type
interface UserState {
  users: any[]; // Replace `any[]` with the actual type for user data if available
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

// Create the slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create user';
      });
  },
});

export default userSlice.reducer;
