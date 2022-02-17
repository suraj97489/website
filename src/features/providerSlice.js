import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sp: "",
  customerName: "",
  customerMobile: "",
  addingcustomer: true,
  providerId: null,

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
    updateSp: (state, action) => {
      state.sp = action.payload;
    },
    updateCustomerName: (state, action) => {
      state.customerName = action.payload;
    },
    updateCustomerMobile: (state, action) => {
      state.customerMobile = action.payload;
    },
    updateAddingcustomer: (state, action) => {
      state.addingcustomer = action.payload;
    },
    updateProviderId: (state, action) => {
      state.providerId = action.payload;
    },
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
    handleOpen: (state, action) => {
      state.selectedServices = [];
      state.addingcustomer = true;
      state.open = true;
      state.providerId(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateSp,
  updateCustomerName,
  updateCustomerMobile,
  updateAddingcustomer,
  updateProviderIdproviderId,
  updateServices,
  updateSelectedServices,
  updateOpen,
  updateCustIndex,
  updateSalonUsername,
  updateButtonDisabled,
  updateAlertProvider,
  updateAlertMessage,
  updatePhotoUploadingProgress,
  handleOpen,
} = providerSlice.actions;

export default providerSlice.reducer;
