import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignupState {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}

const initialState: SignupState = {
  email: "",
  password: "",
  passwordConfirm: "",
  nickname: "",
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setPasswordConfirm: (state, action: PayloadAction<string>) => {
      state.passwordConfirm = action.payload;
    },
    setNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
  },
});

export const { setEmail, setPassword, setPasswordConfirm, setNickname } =
  signupSlice.actions;
export default signupSlice.reducer;
