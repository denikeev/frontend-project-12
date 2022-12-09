import { createSlice } from '@reduxjs/toolkit';

const hasToken = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  return userId && userId.token;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: !!hasToken(),
  reducers: {
    logIn: () => true,
    logOut: () => {
      localStorage.removeItem('userId');
      return false;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
