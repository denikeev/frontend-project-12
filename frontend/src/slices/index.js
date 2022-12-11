import { configureStore } from '@reduxjs/toolkit';

import channelsSlice from './channelsSlice.js';
import messagesSlice from './messagesSlice.js';
import modalSlice from './modalSlice.js';

export default configureStore({
  reducer: {
    channels: channelsSlice,
    messages: messagesSlice,
    modalState: modalSlice,
  },
});
