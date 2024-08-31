import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./slice/signupSlice";

const store = configureStore({
  reducer: {
    signup: signupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
