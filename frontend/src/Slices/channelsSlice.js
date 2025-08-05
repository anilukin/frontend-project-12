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
  },
});

export const { setChannels } = sliceChannels.actions;

export default sliceChannels.reducer;
