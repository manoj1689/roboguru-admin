import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

// Async thunk to fetch education levels
export const fetchEducationLevels = createAsyncThunk(
  'educationLevels/fetchEducationLevels',
  async ({ limit = 10, name = "" }: { limit?: number; name?: string }, { rejectWithValue }) => {
    try {
      console.log('Fetching education levels with:', { limit, name });

      const response = await axios.get('/level/read_list', {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          limit,
          name,
        },
      });

      console.log('Received education levels:', response.data);

      if (response.data.success) {
        return response.data.data || []; // Ensure it returns an array, even if null
      } else {
        throw new Error(response.data.message || 'Failed to fetch education levels');
      }
    } catch (error: any) {
      console.error("Error fetching education levels:", error.message || error);

      return rejectWithValue(
        error.response?.data?.message || error.message || 'An unexpected error occurred'
      );
    }
  }
);

// Async thunk to create an education level
export const createEducationLevel = createAsyncThunk(
  'educationLevels/createEducationLevel',
  async (educationLevel: { name: string; description: string }, { rejectWithValue }) => {
    try {
      console.log('Creating education level with data:', educationLevel);

      const response = await axios.post('/level/create/', educationLevel, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log('Created education level:', response.data);

      if (response.data.success) {
        return response.data.data; // Return the created education level data
      } else {
        throw new Error(response.data.message || 'Failed to create education level');
      }
    } catch (error: any) {
      console.error("Error creating education level:", error.message || error);

      return rejectWithValue(
        error.response?.data?.message || error.message || 'An unexpected error occurred'
      );
    }
  }
);

// Async thunk to fetch a specific education level by ID
export const fetchEducationLevelById = createAsyncThunk(
  'educationLevels/fetchEducationLevelById',
  async (levelId: number, { rejectWithValue }) => {
    try {
      console.log('Fetching education level with ID:', levelId);

      const response = await axios.get(`/level/${levelId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log('Received education level:', response.data);

      if (response.data.success) {
        return response.data.data; // Return the fetched education level data
      } else {
        throw new Error(response.data.message || 'Failed to fetch education level');
      }
    } catch (error: any) {
      console.error("Error fetching education level:", error.message || error);

      return rejectWithValue(
        error.response?.data?.message || error.message || 'An unexpected error occurred'
      );
    }
  }
);

// Async thunk to update an education level by ID
export const updateEducationLevel = createAsyncThunk(
  'educationLevels/updateEducationLevel',
  async ({ levelId, educationLevel }: { levelId: number; educationLevel: { name: string; description: string } }, { rejectWithValue }) => {
    try {
      console.log('Updating education level with ID:', levelId, 'and data:', educationLevel);

      const response = await axios.put(`/level/${levelId}`, educationLevel, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log('Updated education level:', response.data);

      if (response.data.success) {
        return response.data.data; // Return the updated education level data
      } else {
        throw new Error(response.data.message || 'Failed to update education level');
      }
    } catch (error: any) {
      console.error("Error updating education level:", error.message || error);

      return rejectWithValue(
        error.response?.data?.message || error.message || 'An unexpected error occurred'
      );
    }
  }
);

// Async thunk to delete an education level by ID
export const deleteEducationLevel = createAsyncThunk(
  'educationLevels/deleteEducationLevel',
  async (levelId: number, { rejectWithValue }) => {
    try {
      console.log('Deleting education level with ID:', levelId);

      const response = await axios.delete(`/level/${levelId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log('Deleted education level:', response.data);

      if (response.data.success) {
        return levelId; // Return the deleted level ID to remove it from the state
      } else {
        throw new Error(response.data.message || 'Failed to delete education level');
      }
    } catch (error: any) {
      console.error("Error deleting education level:", error.message || error);

      return rejectWithValue(
        error.response?.data?.message || error.message || 'An unexpected error occurred'
      );
    }
  }
);

// Define the state interface for education levels
interface EducationLevel {
  id: number;
  name: string;
  description: string;
}

interface EducationLevelState {
  educationLevels: EducationLevel[]; // Ensure this is an array
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: EducationLevelState = {
  educationLevels: [], // Initialize as an empty array
  loading: false,
  error: null,
};

// Create the slice
const educationLevelSlice = createSlice({
  name: 'educationLevels',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch education levels
      .addCase(fetchEducationLevels.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new fetch
      })
      .addCase(fetchEducationLevels.fulfilled, (state, action) => {
        state.loading = false;
        state.educationLevels = action.payload; // Replace with the fetched data
      })
      .addCase(fetchEducationLevels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch education levels.';
      })

      // Create education level
      .addCase(createEducationLevel.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new creation
      })
      .addCase(createEducationLevel.fulfilled, (state, action) => {
        state.loading = false;
      
        // Ensure the state.educationLevels is an array before adding the payload
        if (Array.isArray(state.educationLevels) && action.payload) {
          state.educationLevels = [...state.educationLevels, action.payload];
        }
      })
      .addCase(createEducationLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to create education level.';
      })

      // Fetch a specific education level by ID
      .addCase(fetchEducationLevelById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEducationLevelById.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally handle specific level data (replace or add to the array)
      })
      .addCase(fetchEducationLevelById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch education level.';
      })

      // Update education level
      .addCase(updateEducationLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEducationLevel.fulfilled, (state, action) => {
        state.loading = false;
        const updatedLevel = action.payload;
        const index = state.educationLevels.findIndex(level => level.id === updatedLevel.id);
        if (index !== -1) {
          state.educationLevels[index] = updatedLevel; // Update the level in the array
        }
      })
      .addCase(updateEducationLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to update education level.';
      })

      // Delete education level
      .addCase(deleteEducationLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEducationLevel.fulfilled, (state, action) => {
        state.loading = false;
        const levelId = action.payload;
        state.educationLevels = state.educationLevels.filter(level => level.id !== levelId); // Remove deleted level
      })
      .addCase(deleteEducationLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to delete education level.';
      });
  },
});

// Export the reducer
export default educationLevelSlice.reducer;
