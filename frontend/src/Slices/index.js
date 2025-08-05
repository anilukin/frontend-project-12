import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import channelsReduser from './channelsSlice.js'
import messagesReducer from './messagesSlice.js'

export default configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReduser,
    messages: messagesReducer,
  },
});
