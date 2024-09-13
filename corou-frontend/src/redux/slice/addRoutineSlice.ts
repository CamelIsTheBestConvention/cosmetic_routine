import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RoutineItem {
  name: string;
  description: string;
  itemKey: number;
}

interface addRoutineState {
  title: string;
  gender: string[];
  skin: number;
  age: number;
  problem: number[];
  grade: number;
  routineItem: RoutineItem[];
  tag: string[];
}

const initialState: addRoutineState = {
  title: "",
  gender: [],
  skin: 0,
  age: 10,
  problem: [],
  grade: 1,
  routineItem: [],
  tag: [],
};

const addRoutineSlice = createSlice({
  name: "addRoutine",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setGender: (state, action: PayloadAction<string[]>) => {
      state.gender = action.payload;
    },
    setSkin: (state, action: PayloadAction<number>) => {
      state.skin = action.payload;
    },
    setAge: (state, action: PayloadAction<number>) => {
      state.age = action.payload;
    },
    setProblem: (state, action: PayloadAction<number[]>) => {
      state.problem = action.payload;
    },
    setGrade: (state, action: PayloadAction<number>) => {
      state.grade = action.payload;
    },
    setRoutineItem: (state, action: PayloadAction<RoutineItem>) => {
      state.routineItem.push(action.payload);
    },
    setTag: (state, action: PayloadAction<string[]>) => {
      state.tag = action.payload;
    },
  },
});

export const {
  setTitle,
  setGender,
  setSkin,
  setAge,
  setProblem,
  setGrade,
  setRoutineItem,
  setTag,
} = addRoutineSlice.actions;
export default addRoutineSlice.reducer;
