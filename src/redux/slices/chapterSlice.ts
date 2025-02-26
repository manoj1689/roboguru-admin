import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

// Define Chapter and ChapterState
export interface Chapter {
  id: string; // Required field
  name: string;
  tagline: string;
  image_link: string;
  subject_id: string;
}

interface ChapterState {
  chapters: Chapter[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ChapterState = {
  chapters: [],
  loading: false,
  error: null,
};

// Async thunk to fetch all chapters
export const fetchChapters = createAsyncThunk(
  'chapters/fetchChapters',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/chapter/read_all_chapter', {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        return response.data.data || [];
      } else {
        throw new Error(response.data.message || 'Failed to fetch chapters');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'An unexpected error occurred');
    }
  }
);

// Async thunk to create a new chapter
export const createChapter = createAsyncThunk(
  'chapters/createChapter',
  async (chapter: { name: string; tagline: string; image_link: string; subject_id: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/chapters/create', chapter, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to create chapter');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'An unexpected error occurred');
    }
  }
);

// Async thunk to update a chapter by chapter_id
export const updateChapter = createAsyncThunk(
  'chapters/updateChapter',
  async (
    { chapter_id, chapter }: { chapter_id: string; chapter: { name: string; tagline: string; image_link: string; subject_id: string } },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(`/chapters/${chapter_id}`, chapter, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to update chapter');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'An unexpected error occurred');
    }
  }
);

// Async thunk to delete a chapter by chapter_id
export const deleteChapter = createAsyncThunk(
  'chapters/deleteChapter',
  async (chapter_id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/chapters/${chapter_id}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        return chapter_id;
      } else {
        throw new Error(response.data.message || 'Failed to delete chapter');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'An unexpected error occurred');
    }
  }
);

// Async thunk to fetch chapters by subject_id
export const fetchChaptersBySubjectId = createAsyncThunk(
  'chapters/fetchChaptersBySubjectId',
  async (subject_id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/chapters/chapter/${subject_id}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        return response.data.data || [];
      } else {
        throw new Error(response.data.message || 'Failed to fetch chapters for the subject');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'An unexpected error occurred');
    }
  }
);

// Create the slice
const chapterSlice = createSlice({
  name: 'chapter',
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch chapters
      .addCase(fetchChapters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChapters.fulfilled, (state, action) => {
        state.loading = false;
        state.chapters = action.payload || [];
      })
      .addCase(fetchChapters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch chapters.';
      })

      // Fetch chapters by subject_id
      .addCase(fetchChaptersBySubjectId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChaptersBySubjectId.fulfilled, (state, action) => {
        state.loading = false;
        state.chapters = action.payload || [];
      })
      .addCase(fetchChaptersBySubjectId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch chapters for the subject.';
      })

      // Create chapter
      .addCase(createChapter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createChapter.fulfilled, (state, action) => {
        state.loading = false;
        
        if (Array.isArray(state.chapters) && action.payload) {
          state.chapters = [...state.chapters, action.payload];
        }
      })
      .addCase(createChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to create chapter.';
      })

      // Update chapter
      .addCase(updateChapter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.chapters = state.chapters.map((chapter) =>
          chapter.id === action.payload.id ? action.payload : chapter
        );
      })
      .addCase(updateChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to update chapter.';
      })

      // Delete chapter
      .addCase(deleteChapter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.chapters = state.chapters.filter((chapter) => chapter.id !== action.payload);
      })
      .addCase(deleteChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to delete chapter.';
      });
  },
});

// Export actions and reducer
export const { resetError } = chapterSlice.actions;
export default chapterSlice.reducer;
