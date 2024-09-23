import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./slice/signupSlice";
import addRoutineSlice from "./slice/addRoutineSlice";
import addressSlice from "./slice/addressSlice";

const store = configureStore({
  reducer: {
    signup: signupReducer,
    addRoutine: addRoutineSlice,
    address: addressSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
