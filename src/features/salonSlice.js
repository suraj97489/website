import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  salon: {
    salonName: "Loading...",
    address: "",
    website: "",
    mobile: "",
    salonPhoto: "Loading....",
    salonCode: "",
    salonPassword: "",
    services: [],
    salonUsername: false,
  },
  salonProvidersfordisplay: [],
  serviceproviders: [],
};

export const salonSlice = createSlice({
  name: "salon",
  initialState,
  reducers: {
    updateSalon: (state, action) => {
      state.salon = action.payload;
    },
    updateSalonProvidersfordisplay: (state, action) => {
      state.salonProvidersfordisplay = action.payload;
    },
    updateServiceproviders: (state, action) => {
      state.serviceproviders = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateSalon,
  updateSalonProvidersfordisplay,
  updateServiceproviders,
} = salonSlice.actions;

export default salonSlice.reducer;
