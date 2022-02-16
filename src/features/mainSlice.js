import { createSlice } from "@reduxjs/toolkit";
let grahakValue = {
  fname: "",
  lname: "",
  mobile: "",
  service: [],
  email: "",
};
let notifyValue = {
  message: "",
  style: {
    backgroundColor: "green",
    color: "white",
  },
};
const initialState = {
  user: "customer",
  milliSeconds: null,
  salonCode: "",
  allSalon: [],
  shopOpen: true,
  checkStatus: false,
  custResponce: null,
  drawerInnerText: "Dashboard",
  grahak: grahakValue,
  idOfProvider: null,
  isOpen: false,
  openDrawer: false,
  overAllCustomers: [],
  notify: notifyValue,
  detailsHeading: null,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateMilliSeconds: (state, action) => {
      state.updateMilliSeconds = action.payload;
    },
    updateSalonCode: (state, action) => {
      state.salonCode = action.payload;
    },
    updateAllSalon: (state, action) => {
      state.allSalon = action.payload;
    },
    updateShopOpen: (state, action) => {
      state.shopOpen = action.payload;
    },
    updateCheckStatus: (state, action) => {
      state.checkStatus = action.payload;
    },
    updateCustResponce: (state, action) => {
      state.custResponce = action.payload;
    },
    updateDrawerInnerText: (state, action) => {
      state.drawerInnerText = action.payload;
    },
    updateGrahak: (state, action) => {
      state.grahak = action.payload;
    },
    updateIdOfProvider: (state, action) => {
      state.idOfProvider = action.payload;
    },
    updateIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    updateOpenDrawer: (state, action) => {
      state.openDrawer = action.payload;
    },
    updateOverAllCustomers: (state, action) => {
      state.overAllCustomers = action.payload;
    },
    updateNotify: (state, action) => {
      state.notify = action.payload;
    },
    updateDetailsHeading: (state, action) => {
      state.detailsHeading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateUser,
  updateMilliSeconds,
  updateSalonCode,
  updateAllSalon,
  updateShopOpen,
  updateCheckStatus,
  updateCustResponce,
  updateDrawerInnerText,
  updateGrahak,
  updateIdOfProvider,
  updateIsOpen,
  updateOpenDrawer,
  updateOverAllCustomers,
  updateNotify,
  updateDetailsHeading,
} = mainSlice.actions;

export default mainSlice.reducer;
