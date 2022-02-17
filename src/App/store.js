import { configureStore } from "@reduxjs/toolkit";
import salon from "../features/salonSlice";
import main from "../features/mainSlice";
import userstate from "../features/userSlice";
import providerstate from "../features/providerSlice";

export const store = configureStore({
  reducer: {
    salon,
    main,
    userstate,
    providerstate,
  },
});
