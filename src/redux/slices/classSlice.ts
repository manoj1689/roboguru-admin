import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/api";

// Define the state interface for classes
interface Class {
  id: string;
  name: string;
  tagline: string;
  image_link: string;
  level_id: string; // Matches your structure
}

interface ClassState {
  classes: Class[]; // Ensure this is an array
  loading: boolean;
  error: string | null;
  classDetails: any | null; // Add a new field to store details of a specific class
}

// Initial state
const initialState: ClassState = {
  classes: [], // Initialize as an empty array
  loading: false,
  error: null,
  classDetails: null, // Initialize as null
};

// Async thunk to fetch classes
export const fetchClasses = createAsyncThunk(
  "classes/fetchClasses",
  async ({ limit = 10, name = "" }: { limit?: number; name?: string }, { rejectWithValue }) => {
    try {
      console.log("Fetching classes with:", { limit, name });

      const response = await axios.get("/classes/read_class_list", {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          limit,
          name,
        },
      });

      console.log("Received classes:", response.data);

      if (response.data.success) {
        return response.data.data || []; // Ensure it returns an array, even if null
      } else {
        throw new Error(response.data.message || "Failed to fetch classes");
      }
    } catch (error: any) {
      console.error("Error fetching classes:", error.message || error);

      return rejectWithValue(
        error.response?.data?.message || error.message || "An unexpected error occurred"
      );
    }
  }
);

// Async thunk to fetch details of a class by class_id
export const fetchClassDetails = createAsyncThunk(
  "classes/fetchClassDetails",
  async (class_id: any, { rejectWithValue }) => {
    try {
      console.log("Fetching class details for class_id:", class_id);

      const response = await axios.get(`/classes/level/${class_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Received class details:", response.data);

      if (response.data.success) {
        return response.data.data || {}; // Return the class details data
      } else {
        throw new Error(response.data.message || "Failed to fetch class details");
      }
    } catch (error: any) {
      console.error("Error fetching class details:", error.message || error);

      return rejectWithValue(
        error.response?.data?.message || error.message || "An unexpected error occurred"
      );
    }
  }
);

// Async thunk to create a new class
export const createClass = createAsyncThunk(
  "classes/createClass",
  async (
    cls: { name: string; tagline: string; image_link: string; level_id: string }, 
    { rejectWithValue }
  ) => {
    try {
      console.log("Creating class with data:", cls);

      const response = await axios.post("/classes/create/", cls, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Created class:", response.data);

      if (response.data.success) {
        return response.data.data; // Return the created class data
      } else {
        throw new Error(response.data.message || "Failed to create class");
      }
    } catch (error: any) {
      console.error("Error creating class:", error.message || error);

      return rejectWithValue(
        error.response?.data?.message || error.message || "An unexpected error occurred"
      );
    }
  }
);

// Async thunk to update a class by class_id
export const updateClass = createAsyncThunk(
  "classes/updateClass",
  async (
    { class_id, cls }: { class_id: string; cls: { name: string; tagline: string; image_link: string; level_id: string } },
    { rejectWithValue }
  ) => {
    try {
      console.log("Updating class with ID:", class_id, "and data:", cls);

      const response = await axios.put(`/classes/${class_id}`, cls, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Updated class:", response.data);

      if (response.data.success) {
        return response.data.data; // Return the updated class data
      } else {
        throw new Error(response.data.message || "Failed to update class");
      }
    } catch (error: any) {
      console.error("Error updating class:", error.message || error);

      return rejectWithValue(
        error.response?.data?.message || error.message || "An unexpected error occurred"
      );
    }
  }
);

// Async thunk to delete a class by class_id
export const deleteClass = createAsyncThunk(
  "classes/deleteClass",
  async (class_id: string, { rejectWithValue }) => {
    try {
      console.log("Deleting class with ID:", class_id);

      const response = await axios.delete(`/classes/${class_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Deleted class:", response.data);

      if (response.data.success) {
        return class_id; // Return the deleted class_id for removal from the state
      } else {
        throw new Error(response.data.message || "Failed to delete class");
      }
    } catch (error: any) {
      console.error("Error deleting class:", error.message || error);

      return rejectWithValue(
        error.response?.data?.message || error.message || "An unexpected error occurred"
      );
    }
  }
);

// Async thunk to fetch classes by level_id
export const fetchClassesByLevel = createAsyncThunk(
  "classes/fetchClassesByLevel",
  async (level_id: string, { rejectWithValue }) => {
    try {
      console.log("Fetching classes for level_id:", level_id);

      const response = await axios.get(`/classes/level/${level_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Received classes for level:", response.data);

      if (response.data.success) {
        return response.data.data || []; // Ensure it returns an array
      } else {
        throw new Error(response.data.message || "Failed to fetch classes by level");
      }
    } catch (error: any) {
      console.error("Error fetching classes by level:", error.message || error);

      return rejectWithValue(
        error.response?.data?.message || error.message || "An unexpected error occurred"
      );
    }
  }
);


// Create the slice
const classSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null; // Action to reset the error state
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch classes
      .addCase(fetchClasses.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new fetch
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload; // Replace with the fetched data
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch classes.";
      })

      // Fetch class details by class_id
      .addCase(fetchClassDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.classDetails = null; // Reset previous class details
      })
      .addCase(fetchClassDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.classDetails = action.payload; // Store the fetched class details
        
      })
      .addCase(fetchClassDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch class details.";
      })

      // Create class
      .addCase(createClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure the state.educationLevels is an array before adding the payload
        if (Array.isArray(state.classes) && action.payload) {
          state.classes = [...state.classes, action.payload];
        }
       
      })
      .addCase(createClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to create class.";
      })

      // Update class
      .addCase(updateClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClass.fulfilled, (state, action) => {
        state.loading = false;
        const updatedClass = action.payload;
        state.classes = state.classes.map((cls) =>
          cls.id === updatedClass.id ? updatedClass : cls
        );
      })
      .addCase(updateClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to update class.";
      })

      // Delete class
      .addCase(deleteClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.loading = false;
        const deletedClassId = action.payload;
        state.classes = state.classes.filter((cls) => cls.id !== deletedClassId);
      })
      .addCase(deleteClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to delete class.";
      })

      // Fetch classes by level_id
      .addCase(fetchClassesByLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClassesByLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload; // Replace with the fetched data
      })
      .addCase(fetchClassesByLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch classes by level.";
      });
  },
});

// Export the synchronous actions
export const { resetError } = classSlice.actions;

// Export the reducer
export default classSlice.reducer;
