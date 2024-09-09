import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RoutineItem {
  단계: string;
  제품: string;
}

interface addRoutineState {
  forRoutine: number[];
  grade: number;
  routineItem: RoutineItem[];
  tag: string[];
}

const initialState: addRoutineState = {
  forRoutine: [],
  grade: 0,
  routineItem: [],
  tag: [],
};

const addRoutineSlice = createSlice({
  name: "addRoutine",
  initialState,
  reducers: {
    setForRoutine: (state, action: PayloadAction<number[]>) => {
      state.forRoutine = action.payload;
    },
    setGrade: (state, action: PayloadAction<number>) => {
      state.grade = action.payload;
    },
    setRoutineItem: (state, action: PayloadAction<RoutineItem[]>) => {
      state.routineItem = action.payload;
    },
    setTag: (state, action: PayloadAction<string[]>) => {
      state.tag = action.payload;
    },
  },
});

export const { setForRoutine, setGrade, setRoutineItem, setTag } =
  addRoutineSlice.actions;
export default addRoutineSlice.reducer;
