import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: null,
  userBooked: false,
};

export const userSlice = createSlice({
  name: "userstate",
  initialState,
  reducers: {
    updateCustomer: (state, action) => {
      state.customer = action.payload;
    },
    updateUserBooked: (state, action) => {
      state.userBooked = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCustomer, updateUserBooked } = userSlice.actions;

export default userSlice.reducer;
