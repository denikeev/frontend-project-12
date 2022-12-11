/* eslint no-param-reassign:
["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }]  */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { type: null, channel: null },
  reducers: {
    hideModal: () => ({ type: null, channel: null }),
    showModal: (state, { payload }) => {
      state.type = payload.type;
      state.channel = payload.channel || null;
    },
  },
});

export default modalSlice.reducer;
export const { showModal, hideModal } = modalSlice.actions;
