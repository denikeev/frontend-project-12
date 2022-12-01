import { configureStore } from '@reduxjs/toolkit';

import authSlice from './authSlice.js';
import channelsSlice from './channelsSlice.js';
import messagesSlice from './messagesSlice.js';
import modalSlice from './modalSlice.js';

export default configureStore({
  reducer: {
    auth: authSlice,
    channels: channelsSlice,
    messages: messagesSlice,
    modal: modalSlice,
  },
});
