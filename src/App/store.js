import { configureStore } from "@reduxjs/toolkit";
import salon from "../features/salonSlice";
import main from "../features/mainSlice";

export const store = configureStore({
  reducer: {
    salon,
    main,
  },
});
