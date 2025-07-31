import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.jsx';

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
