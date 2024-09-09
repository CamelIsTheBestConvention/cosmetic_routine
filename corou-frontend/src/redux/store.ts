import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./slice/signupSlice";
import addRoutineSlice from "./slice/addRoutineSlice";

const store = configureStore({
  reducer: {
    signup: signupReducer,
    addRoutine: addRoutineSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
