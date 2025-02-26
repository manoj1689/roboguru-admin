import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

// Define types for the Profile and ProfileState if you have a specific shape for them
interface Profile {
  // Define the properties of a profile here
}

interface ProfileState {
  profiles: Profile[];
  loading: boolean;
  error: string | null;
}

// Async Thunks
export const fetchProfiles = createAsyncThunk<Profile[]>('profiles/fetchProfiles', async () => {
  const response = await axios.get('/profiles/read_profiles_profiles__get');
  return response.data;
});

export const createProfile = createAsyncThunk<Profile, Profile>('profiles/createProfile', async (profile) => {
  const response = await axios.post('/profiles/create_profile_profiles__post', profile);
  return response.data;
});

// Initial State
const initialState: ProfileState = {
  profiles: [],
  loading: false,
  error: null,
};

// Create Slice
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch profiles';
      })
      .addCase(createProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles.push(action.payload);
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create profile';
      });
  },
});

export default profileSlice.reducer;
