import {
  createEntityAdapter,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit'
import { removeChannel } from './channelsSlice'

const messagesSliceAdapter = createEntityAdapter()
const initialState = messagesSliceAdapter.getInitialState()

const sliceChannels = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, { payload }) => {
      messagesSliceAdapter.setAll(state, payload)
    },
    addMessage: (state, { payload }) => {
      messagesSliceAdapter.addOne(state, payload)
    },
  },
  extraReducers: builder => {
    builder.addCase(removeChannel, (state, action) => {
      const channelId = action.payload
      const restEntities = Object.values(state.entities).filter(
        e => e.channelId !== channelId,
      )
      messagesSliceAdapter.setAll(state, restEntities)
    })
  },
})

export const selectChannelMessages = createSelector(
  [state => state.messages, (state, channelId) => channelId],
  (messagesState, channelId) =>
    messagesSliceAdapter
      .getSelectors()
      .selectAll(messagesState)
      .filter(msg => msg.channelId === channelId),
)

export const { setMessages, addMessage } = sliceChannels.actions

export default sliceChannels.reducer
