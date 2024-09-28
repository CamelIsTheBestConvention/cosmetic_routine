import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface itemData {
  item_key: number;
  item_name: string;
  item_price: number;
  volume: number;
  average_rating: number;
  brand_name: string;
  category: string;
  description: string;
}

interface RoutineItem {
  step_number: number;
  step_name: string;
  description: string;
  item_key: string;
  item_name: string;
}

interface editRoutineState {
  title: string;
  gender: string[];
  skin: number;
  age: number;
  problem: number[];
  grade: number;
  routineItem: RoutineItem[];
  tag: string[];
  totalPrice: number;
  itemList: itemData[];
}

const initialState: editRoutineState = {
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
  itemList: [],
  totalPrice: 0,
};

const editRoutineSlice = createSlice({
  name: "editRoutine",
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
      const newGrade = action.payload;
      state.grade = action.payload;

      if (newGrade < state.routineItem.length) {
        state.routineItem = state.routineItem.slice(0, newGrade);
      } else {
        for (let i = state.routineItem.length; i < newGrade; i++) {
          state.routineItem.push({
            step_number: i + 1,
            step_name: "",
            description: "",
            item_key: "",
            item_name: "",
          });
        }
      }

      if (newGrade < state.itemList.length) {
        state.itemList = state.itemList.slice(0, newGrade);
      } else {
        for (let i = state.itemList.length; i < newGrade; i++) {
          state.itemList.push({
            item_key: 0,
            item_name: "",
            item_price: 0,
            volume: 0,
            average_rating: 0,
            brand_name: "",
            category: "",
            description: "",
          });
        }
      }
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
    setItemList: (state, action: PayloadAction<itemData[]>) => {
      state.itemList = action.payload;

      state.totalPrice = state.itemList.reduce(
        (acc, item) => acc + item.item_price,
        0
      );
    },
    clearSelectedItems: (state) => {
      state.itemList = [];
    },
    setTotalPrice: (state, action: PayloadAction<number>) => {
      state.totalPrice = action.payload;
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
  setItemList,
  setTotalPrice,
  resetAddRoutine,
} = editRoutineSlice.actions;
export default editRoutineSlice.reducer;
