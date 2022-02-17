import { configureStore } from "@reduxjs/toolkit";
import salon from "../features/salonSlice";
import main from "../features/mainSlice";
import usercontext from "../features/userSlice";

export const store = configureStore({
  reducer: {
    salon,
    main,
    usercontext,
  },
});
