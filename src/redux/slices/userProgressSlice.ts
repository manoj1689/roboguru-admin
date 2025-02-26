import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

// Define async thunks
export const fetchUserProgresses = createAsyncThunk('userProgress/fetchUserProgresses', async () => {
  const response = await axios.get('/user_progress/read_user_progresses_user_progress__get');
  return response.data;
});

export const createUserProgress = createAsyncThunk('userProgress/createUserProgress', async (progress: any) => {
  const response = await axios.post('/user_progress/create_user_progress_user_progress__post', progress);
  return response.data;
});

// Define the state type
interface UserProgressState {
  progresses: any[]; // Replace `any[]` with the actual type for user progress data if available
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: UserProgressState = {
  progresses: [],
  loading: false,
  error: null,
};

// Create the slice
const userProgressSlice = createSlice({
  name: 'userProgress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProgresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProgresses.fulfilled, (state, action) => {
        state.loading = false;
        state.progresses = action.payload;
      })
      .addCase(fetchUserProgresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user progresses';
      })
      .addCase(createUserProgress.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUserProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progresses.push(action.payload);
      })
      .addCase(createUserProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create user progress';
      });
  },
});

export default userProgressSlice.reducer;
