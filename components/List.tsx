"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllUser, userDelete } from "@/redux/action";
import { AppDispatch, RootState } from "@/redux/store";
import { Button } from "./ui/button";
import { Users } from "@/redux/reducer";

export const List = () => {
  const dispatch = useDispatch<AppDispatch>();
  // This is from the store
  const { loading, users, error, edit } = useSelector((state: any) => state.users);

  const [getInput, setInput] = useState({
    name: "", email: "", salary: "", gender: "",
  });
  const [getEdit, setEdit] = useState(false);
  const [getId,setId] = useState()

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const onDelete = (id: any) => {
    dispatch(userDelete(id));
  };


  const onEdit = (id: any) => {
    setInput({
      // ...getInput,
      name: users[id].name,
      email: users[id].email,
      salary: users[id].salary,
      gender: users[id].gender,
    });
    console.log(getInput)
    setEdit(true);
    // setId(users[index].id)
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if(error) {
    return <h1> An Error Occured</h1>
  }

  return (
    <div>
      <h1 className="text-center text-2xl font-bold"> All the Users</h1>
      <Table className="w-2/3 mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>email</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead className="">Salary</TableHead>
            <TableHead className="">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: any, index: number) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell className="">{user.salary}</TableCell>
              <TableCell>
                <Button
                  onClick={() => onDelete(user.id)}
                  className="cursor-pointer" variant="outline"
                >
                  Delete
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => onEdit(index)}
                  className="cursor-pointer"
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
