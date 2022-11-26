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
  initialState: channelsAdapter.getInitialState({ defaultChannelId: null, currentChannelId: null }),
  reducers: {
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: (state, { payload }) => {
      channelsAdapter.addOne(state, payload);
    },
    deleteChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state, payload);
      state.currentChannelId = state.defaultChannelId;
    },
    renameChannel: channelsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, { payload }) => {
      const { channels } = payload;
      channelsAdapter.addMany(state, channels);
      state.defaultChannelId = payload.currentChannelId;
      state.currentChannelId = payload.currentChannelId;
    });
  },
});

export default channelsSlice.reducer;
export const {
  setCurrentChannel,
  addChannel,
  deleteChannel,
  renameChannel,
} = channelsSlice.actions;
export const channelsSelector = channelsAdapter.getSelectors((state) => state.channels);
