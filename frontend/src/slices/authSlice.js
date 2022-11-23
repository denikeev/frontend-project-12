import { createSlice } from '@reduxjs/toolkit';

const hasToken = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  return userId && userId.token;
};

const initialState = {
  loggedIn: hasToken(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state) => {
      state.loggedIn = true;
    },
    logOut: (state) => {
      localStorage.removeItem('userId');
      state.loggedIn = false;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
