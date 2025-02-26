import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

export interface Subject {
  id: string;
  name: string;
  tagline: string;
  image_link: string;
  image_prompt: string; // New field added
  class_id: string | null;
}


interface SubjectState {
  subjects: Subject[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: SubjectState = {
  subjects: [],
  loading: false,
  error: null,
};

// Async thunk to fetch subjects
export const fetchSubjects = createAsyncThunk(
  'subjects/fetchSubjects',
  async ({ limit = 10, name = '' }: { limit?: number; name?: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get('/subjects/read_subjects_list', {
        headers: { 'Content-Type': 'application/json' },
        params: { limit, name },
      });

      if (response.data.success) {
        return response.data.data || [];
      } else {
        throw new Error(response.data.message || 'Failed to fetch subjects');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'An unexpected error occurred');
    }
  }
);
// Async thunk to create a new subject
export const createSubject = createAsyncThunk(
  'subjects/createSubject',
  async (subject: { name: string; tagline: string; image_link: string; image_prompt: string; class_id: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/subjects/create/', subject, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to create subject');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'An unexpected error occurred');
    }
  }
);


// Async thunk to update a subject
export const updateSubject = createAsyncThunk(
  'subjects/updateSubject',
  async (
    { subject_id, subject }: { subject_id: string; subject: { name: string; tagline: string; image_link: string; image_prompt: string; class_id: string } },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(`/subjects/${subject_id}`, subject, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to update subject');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'An unexpected error occurred');
    }
  }
);


// Async thunk to delete a subject
export const deleteSubject = createAsyncThunk(
  'subjects/deleteSubject',
  async (subject_id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/subjects/${subject_id}/`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        return subject_id;
      } else {
        throw new Error(response.data.message || 'Failed to delete subject');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'An unexpected error occurred');
    }
  }
);


// Async thunk to fetch subjects by class_id
export const fetchSubjectsByClassId = createAsyncThunk(
  'subjects/fetchSubjectsByClassId',
  async (class_id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/subjects/class/${class_id}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        return response.data.data || [];
      } else {
        throw new Error(response.data.message || 'Failed to fetch subjects for the class');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'An unexpected error occurred');
    }
  }
);

// Create the slice
const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch subjects
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload || [];
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch subjects.';
      })

      // Fetch subjects by class_id
      .addCase(fetchSubjectsByClassId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjectsByClassId.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload || [];
      })
      .addCase(fetchSubjectsByClassId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch subjects for the class.';
      })

      // Create subject
      .addCase(createSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubject.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.subjects) && action.payload) {
          state.subjects = [...state.subjects, action.payload];
        }
     
      })
      .addCase(createSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to create subject.';
      })

      // Update subject
      .addCase(updateSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = state.subjects.map((subject) =>
          subject.id === action.payload.id ? action.payload : subject
        );
      })
      .addCase(updateSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to update subject.';
      })

      // Delete subject
      .addCase(deleteSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = state.subjects.filter((subject) => subject.id !== action.payload);
      })
      .addCase(deleteSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to delete subject.';
      });
  },
});

// Export actions and reducer
export const { resetError } = subjectSlice.actions;
export default subjectSlice.reducer;
