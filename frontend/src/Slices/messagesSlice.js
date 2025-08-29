import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

export const messagesSliceAdapter = createEntityAdapter();
const initialState = messagesSliceAdapter.getInitialState();

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
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
      const channelId = action.payload;
      const restEntities = Object.values(state.entities).filter(e => e.channelId !== channelId)
      messagesSliceAdapter.setAll(state, restEntities)
    })
  }
});

export const { setMessages, addMessage } = sliceChannels.actions;

export default sliceChannels.reducer;
