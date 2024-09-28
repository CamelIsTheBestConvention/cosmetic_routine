import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./slice/signupSlice";
import addRoutineSlice from "./slice/addRoutineSlice";
import addressSlice from "./slice/addressSlice";
import editRoutineSlice from "./slice/editRoutineSlice";

const store = configureStore({
  reducer: {
    signup: signupReducer,
    addRoutine: addRoutineSlice,
    editRoutine: editRoutineSlice,
    address: addressSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
