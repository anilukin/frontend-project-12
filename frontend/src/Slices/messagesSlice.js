import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};
const sliceChannels = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, { payload }) => {
      state.messages = payload;
    },
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
});

export const { setMessages, addMessage } = sliceChannels.actions;

export default sliceChannels.reducer;
