import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sp: "",
  customerName: "",
  customerMobile: "",
  addingcustomer: true,
  providerIdproviderId: null,

  services: [{ name: "", charges: "" }],
  selectedServices: [],
  open: false,
  custIndex: null,
  salonUsername: "username",
  buttonDisabled: true,
  alertProvider: false,
  alertMessage: null,
  photoUploadingProgress: 0,
};

export const providerSlice = createSlice({
  name: "providerstate",
  initialState,
  reducers: {
    updateServices: (state, action) => {
      state.services = action.payload;
    },
    updateSelectedServices: (state, action) => {
      state.selectedServices = action.payload;
    },
    updateOpen: (state, action) => {
      state.open = action.payload;
    },
    updateCustIndex: (state, action) => {
      state.custIndex = action.payload;
    },
    updateSalonUsername: (state, action) => {
      state.salonUsername = action.payload;
    },
    updateButtonDisabled: (state, action) => {
      state.buttonDisabled = action.payload;
    },
    updateAlertProvider: (state, action) => {
      state.alertProvider = action.payload;
    },
    updateAlertMessage: (state, action) => {
      state.alertMessage = action.payload;
    },
    updatePhotoUploadingProgress: (state, action) => {
      state.photoUploadingProgress = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateServices,
  updateSelectedServices,
  updateOpen,
  updateCustIndex,
  updateSalonUsername,
  updateButtonDisabled,
  updateAlertProvider,
  updateAlertMessage,
  updatePhotoUploadingProgress,
} = providerSlice.actions;

export default providerSlice.reducer;
