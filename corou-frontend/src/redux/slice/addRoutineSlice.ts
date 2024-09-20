import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RoutineItem {
  step_number: number;
  step_name: string;
  description: string;
  item_key: string;
  item_name: string;
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
  age: 0,
  problem: [],
  grade: 1,
  routineItem: new Array(1).fill({
    step_number: 1,
    step_name: "",
    description: "",
    item_key: "",
    item_name: "",
  }),
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
    setRoutineItem: (
      state,
      action: PayloadAction<{ index: number; item: RoutineItem }>
    ) => {
      state.routineItem[action.payload.index] = action.payload.item;
    },
    setTag: (state, action: PayloadAction<string[]>) => {
      state.tag = action.payload;
    },
    resetAddRoutine(state) {
      return initialState;
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
  resetAddRoutine,
} = addRoutineSlice.actions;
export default addRoutineSlice.reducer;
