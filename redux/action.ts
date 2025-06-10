import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface CreateUserPayload {
  name: string;
  email: string;
  gender: string;
  salary: number; //
}

export const getAllUser = createAsyncThunk ('getAllUser', async(_, { rejectWithValue })=>{

  try {
      const user = await axios.get("https://64a2d298b45881cc0ae5c169.mockapi.io/user");
      return user.data

  } catch (error: any) {
      // console.log(error)
      // return Promise.reject(error)
      return rejectWithValue(error.response?.data || 'Error fetching users');
  }
})

export const createUser = createAsyncThunk('user/createUser',async (data: CreateUserPayload)=>{
  try {
      const user = await axios.post("https://64a2d298b45881cc0ae5c169.mockapi.io/user",data)
      return user.data
  } catch (error) {
      Promise.reject(error)
  }
})


export const userDelete = createAsyncThunk('delete', async (id)=>{
  try {  
      const user = await axios.delete(`https://64a2d298b45881cc0ae5c169.mockapi.io/user/${id}`)
      return user.data
  } catch (error) {
      Promise.reject(error)
  }

})

export const userUpdate = createAsyncThunk('update', async ({getId,getInput}: any)=>{

  try {
      const user =await axios.put(`https://64a2d298b45881cc0ae5c169.mockapi.io/user/${getId}`,getInput)
      return user.data
  } catch (error) {
      Promise.reject(error)
  }

})