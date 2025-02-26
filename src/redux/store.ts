// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import profileReducer from './slices/profileSlice';
import educationLevelReducer from './slices/educationlevelSlice';
import classReducer from './slices/classSlice';
import subjectReducer from './slices/subjectSlice';
import chapterReducer from './slices/chapterSlice';
import topicReducer from './slices/topicSlice';
import userProgressReducer from './slices/userProgressSlice';
import authReducer from './slices/authslice'; // Import the auth slice

const store = configureStore({
  reducer: {
    auth: authReducer,  // Add the auth slice to the store
    user: userReducer,
    profile: profileReducer,
    educationLevel: educationLevelReducer,
    class: classReducer,
    subject: subjectReducer,
    chapter: chapterReducer,
    topic: topicReducer,
    userProgress: userProgressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
