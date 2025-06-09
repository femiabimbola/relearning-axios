import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  input: {
    name: '',
    email: '',
    salary: '',
    gender: '',
  },
  edit: false,
  id: null, // Use null instead of undefined for clarity
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setInput: (state, action) => {
      state.input = { ...state.input, ...action.payload };
    },
    setEdit: (state, action) => {
      state.edit = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    resetForm: (state) => {
      state.input = initialState.input;
      state.edit = false;
      state.id = null;
    },
  },
});


export const { setInput, setEdit, setId, resetForm } = formSlice.actions;
export default formSlice.reducer;