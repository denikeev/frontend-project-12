import { configureStore } from '@reduxjs/toolkit';

import authSlice from './authSlice.js';
import channelsSlice from './channelsSlice.js';
import messagesSlice from './messagesSlice.js';

export default configureStore({
  reducer: {
    loggedIn: authSlice,
    channels: channelsSlice,
    messages: messagesSlice,
  },
});
