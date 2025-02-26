import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

// Define Topic and TopicState
export interface Topic {
  id: string;
  name: string;
  tagline: string;
  image_link: string;
  details: string;
  chapter_id: string;
}

interface TopicState {
  topics: Topic[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: TopicState = {
  topics: [],
  loading: false,
  error: null,
};

// Async thunk to fetch all topics
export const fetchTopics = createAsyncThunk(
  'topics/fetchTopics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/topics/read_all_topic', {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        return response.data.data || [];
      } else {
        throw new Error(response.data.message || 'Failed to fetch topics');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'An unexpected error occurred');
    }
  }
);

// Async thunk to create a new topic
export const createTopic = createAsyncThunk(
  'topics/createTopic',
  async (topic: { name: string; tagline: string; image_link: string; details: string; chapter_id: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/topics/create', topic, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to create topic');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'An unexpected error occurred');
    }
  }
);

// Async thunk to update a topic by topic_id
export const updateTopic = createAsyncThunk(
  'topics/updateTopic',
  async (
    { topic_id, topic }: { topic_id: string; topic: { name: string; tagline: string; image_link: string; details: string; chapter_id: string } },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(`/topics/${topic_id}`, topic, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to update topic');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'An unexpected error occurred');
    }
  }
);

// Async thunk to delete a topic by topic_id
export const deleteTopic = createAsyncThunk(
  'topics/deleteTopic',
  async (topic_id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/topics/${topic_id}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        return topic_id;
      } else {
        throw new Error(response.data.message || 'Failed to delete topic');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'An unexpected error occurred');
    }
  }
);

// Async thunk to fetch topics by chapter_id
export const fetchTopicsByChapterId = createAsyncThunk(
  'topics/fetchTopicsByChapterId',
  async (chapter_id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/topics/chapter/${chapter_id}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        return response.data.data || [];
      } else {
        throw new Error(response.data.message || 'Failed to fetch topics for the chapter');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'An unexpected error occurred');
    }
  }
);

// Create the slice
const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch topics
      .addCase(fetchTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload || [];
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch topics.';
      })

      // Create topic
      .addCase(createTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTopic.fulfilled, (state, action) => {
        state.loading = false;
        
        if (Array.isArray(state.topics) && action.payload) {
          state.topics = [...state.topics, action.payload];
        }
      })
      .addCase(createTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to create topic.';
      })

      // Update topic
      .addCase(updateTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = state.topics.map((topic) =>
          topic.id === action.payload.id ? action.payload : topic
        );
      })
      .addCase(updateTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to update topic.';
      })

      // Delete topic
      .addCase(deleteTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = state.topics.filter((topic) => topic.id !== action.payload);
      })
      .addCase(deleteTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to delete topic.';
      })

      // Fetch topics by chapter_id
      .addCase(fetchTopicsByChapterId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopicsByChapterId.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload || [];
      })
      .addCase(fetchTopicsByChapterId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch topics for the chapter.';
      });
  },
});

// Export actions and reducer
export const { resetError } = topicSlice.actions;
export default topicSlice.reducer;
