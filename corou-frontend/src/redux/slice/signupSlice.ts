import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignupState {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  birth: string;
  gender: string;
  skinType: number;
  color: number;
  trouble: number[];
}

const initialState: SignupState = {
  email: "",
  password: "",
  passwordConfirm: "",
  nickname: "",
  birth: "",
  gender: "",
  skinType: 0,
  color: 0,
  trouble: [],
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
    setBirth: (state, action: PayloadAction<string>) => {
      state.birth = action.payload;
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
    setTrouble: (state, action: PayloadAction<number[]>) => {
      state.trouble = action.payload;
    },
  },
});

export const {
  setEmail,
  setPassword,
  setPasswordConfirm,
  setNickname,
  setBirth,
  setGender,
  setSkinType,
  setColor,
  setTrouble,
} = signupSlice.actions;
export default signupSlice.reducer;
