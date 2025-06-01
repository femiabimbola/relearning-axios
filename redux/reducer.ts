import { createSlice } from "@reduxjs/toolkit";
import { createUser, getAllUser, userDelete, userUpdate } from "./action";


interface Users {
  loading: boolean;
  users: any[]; // You might want to define a more specific type for users
  error: string;
}

const initialState: Users = {
  loading: false,
  users: [],
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  
  reducers: {},

  extraReducers:(builder)=>{
    // Get all 
    builder
    .addCase(getAllUser.pending, (state)=>{
        state.loading = true;
    })
    .addCase(getAllUser.fulfilled ,(state,action)=>{
        state.loading = false;
        state.users = action.payload
    })
    .addCase(getAllUser.rejected, (state,action)=>{
        state.loading = false;
        state.users = [];
        state.error = action.error.message as string
    })

    // Get user
        //create user
        .addCase(createUser.pending ,(state)=>{
          state.loading = true;
      })
      .addCase(createUser.fulfilled ,(state,action)=>{
          state.loading = false;
          state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state,action)=>{
          state.loading = false;
          state.error = action.error.message as any
      })
  }

});
