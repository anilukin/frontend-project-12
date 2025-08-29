import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
};
const sliceChannels = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, { payload }) => {
      state.channels = payload;
    },
    removeChannel: (state, {payload}) => {
      state.channels = state.channels.filter((ch) => ch.id !== payload )
    }
  },
});

export const { setChannels, removeChannel } = sliceChannels.actions;

export default sliceChannels.reducer;
