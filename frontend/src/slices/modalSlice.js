import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { show: false },
  reducers: {
    showModal: (state) => {
      state.show = true;
    },
    hideModal: (state) => {
      state.show = false;
    },
  },
});

export default modalSlice.reducer;
export const { showModal, hideModal } = modalSlice.actions;
