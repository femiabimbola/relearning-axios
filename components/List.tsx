"use client";


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from 'react-redux'
import  { useEffect } from 'react'
import { getAllUser, userDelete } from "@/redux/action";
import { AppDispatch, RootState } from '@/redux/store';


export const List = () => {
  const dispatch = useDispatch<AppDispatch>()
  // This is from the store
  const {loading,users} = useSelector((state: any)=> state.users)

  console.log(users)

  useEffect(()=>{
    dispatch(getAllUser())
  },[dispatch])

  if(loading){
    return <h1>Loading...</h1>
  }

  return (
  
      <Table className="w-2/3 mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead >Name</TableHead>
            <TableHead>email</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead className="text-right">Salary</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {users.map((user: any) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.gender}</TableCell>
            <TableCell className="text-right">{user.salary}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
  
  );
};
