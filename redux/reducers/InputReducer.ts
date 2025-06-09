import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const inputSlice = createSlice({
  name: "input",
  initialState,

  reducers: {
  },
})
