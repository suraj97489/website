import { configureStore } from "@reduxjs/toolkit";
import salon from "../features/salonSlice";

export const store = configureStore({
  reducer: {
    salon,
  },
});
