import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignupState {
  email: string;
  password: string;
  passwordConfirm: string;
  username: string;
  birth_date: string;
  gender: string;
  skinType: number;
  color: number;
  attributes: number[];
}

const initialState: SignupState = {
  email: "",
  password: "",
  passwordConfirm: "",
  username: "",
  birth_date: "",
  gender: "",
  skinType: 0,
  color: 0,
  attributes: [],
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
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setBirth_date: (state, action: PayloadAction<string>) => {
      state.birth_date = action.payload;
    },
    setGender: (state, action: PayloadAction<string>) => {
      state.gender = action.payload;
    },
    setSkinType: (state, action: PayloadAction<number>) => {
      state.skinType = action.payload;
    },
    setColor: (state, action: PayloadAction<number>) => {
      state.color = action.payload;
    },
    setAttributes: (state, action: PayloadAction<number[]>) => {
      state.attributes = action.payload;
    },
  },
});

export const {
  setEmail,
  setPassword,
  setPasswordConfirm,
  setUsername,
  setBirth_date,
  setGender,
  setSkinType,
  setColor,
  setAttributes,
} = signupSlice.actions;
export default signupSlice.reducer;
