import axios from 'axios';

import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';

import routes from '../routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const response = await axios.get(
      routes.channelsDataPath(),
      { headers: { ...getAuthHeader() } },
    );
    return response.data;
  },
);

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({ currentChannelId: null }),
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, { payload }) => {
      const { channels } = payload;
      channelsAdapter.addMany(state, channels);
      state.currentChannelId = payload.currentChannelId;
    });
  },
});

export default channelsSlice.reducer;
export const channelsSelector = channelsAdapter.getSelectors((state) => state.channels);
