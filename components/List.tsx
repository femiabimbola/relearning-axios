"use client";

import ReduxProvider from "@/app/providers";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const List = () => {
  console.log("HEY BRO");

  return (
    <ReduxProvider>
      <Table>
        <TableCaption> The List of Users</TableCaption>
      </Table>
      <div>
        <p> The list component</p>
      </div>
    </ReduxProvider>
  );
};
