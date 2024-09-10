import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RoutineItem {
  order: string;
  description: string;
  itemName: string;
}

interface addRoutineState {
  title: string;
  forRoutine: number[];
  grade: number;
  routineItem: RoutineItem[];
  tag: string[];
}

const initialState: addRoutineState = {
  title: "",
  forRoutine: [],
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
    setForRoutine: (state, action: PayloadAction<number[]>) => {
      state.forRoutine = action.payload;
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

export const { setTitle, setForRoutine, setGrade, setRoutineItem, setTag } =
  addRoutineSlice.actions;
export default addRoutineSlice.reducer;
