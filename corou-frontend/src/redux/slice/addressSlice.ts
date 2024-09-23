import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface addressData {
  address_key: number;
  address_name: string;
  name: string;
  addr: string;
  addr_detail: string;
  zip: string;
  tel: string;
  request: string;
}

interface addressState {
  address_key: number;
  address_name: string;
  name: string;
  addr: string;
  addr_detail: string;
  zip: string;
  tel: string;
  request: string;
  selectAddress: addressData | null;
}

const initialState: addressState = {
  address_key: 0,
  address_name: "",
  name: "",
  addr: "",
  addr_detail: "",
  zip: "",
  tel: "",
  request: "",
  selectAddress: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddrKey: (state, action: PayloadAction<number>) => {
      state.address_key = action.payload;
    },
    setAddressName: (state, action: PayloadAction<string>) => {
      state.address_name = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setAddr: (state, action: PayloadAction<string>) => {
      state.addr = action.payload;
    },
    setAddrDetail: (state, action: PayloadAction<string>) => {
      state.addr_detail = action.payload;
    },
    setZip: (state, action: PayloadAction<string>) => {
      state.zip = action.payload;
    },
    setTel: (state, action: PayloadAction<string>) => {
      state.tel = action.payload;
    },
    setRequest: (state, action: PayloadAction<string>) => {
      state.request = action.payload;
    },
    setSelectAddress: (state, action: PayloadAction<addressData | null>) => {
      state.selectAddress = action.payload;
    },
  },
});

export const {
  setAddrKey,
  setAddressName,
  setName,
  setAddr,
  setAddrDetail,
  setZip,
  setTel,
  setRequest,
  setSelectAddress,
} = addressSlice.actions;
export default addressSlice.reducer;
