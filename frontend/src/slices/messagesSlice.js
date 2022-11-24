import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchChannels } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, { payload }) => {
      const { messages } = payload;
      messagesAdapter.addMany(state, messages);
    });
  },
});

export default messagesSlice.reducer;
export const { addMessage } = messagesSlice.actions;
export const messagesSelector = messagesAdapter.getSelectors((state) => state.messages);
