import { createSlice } from "@reduxjs/toolkit";
import { createUser, getAllUser, userDelete, userUpdate } from "./action";

interface Users {
  loading: boolean;
  users: any[]; // You might want to define a more specific type for users
  error: string | null;
}

const initialState: Users = {
  loading: false,
  users: [],
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // Get all
    builder
      .addCase(getAllUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = action.error.message as string;
      })

      //create user
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as any;
      })

      //Delete User
      .addCase(userDelete.pending, (state) => {
        state.loading = true;
      })

      .addCase(userDelete.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        const data1 = state.users.find((ele) => ele.id === id);
        if (data1) {
          state.users = state.users.filter((ele) => ele.id !== id);
        }
      })

      .addCase(userDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })

      .addCase(userUpdate.pending, (state) => {
        state.loading = true;
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((ele) => {
          if (ele.id === action.payload.id) {
            return (ele = action.payload);
          } else {
            return ele;
          }
        });
      })
      .addCase(userUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export default userSlice.reducer;
