"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { AppDispatch, RootState } from "@/redux/store";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createUser, userUpdate } from "@/redux/action";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { setInput, setEdit, setId, resetForm } from "@/redux/reducers/formReducer";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  gender: z.enum(["male", "female"], {
    errorMap: (issue, ctx) => ({
      message: "Please select either 'male' or 'female'.",
    }),
  }),
  salary: z.coerce
    .number()
    .nonnegative({ message: "Salary must be a non-negative number." }),
});

export const CreateUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { input, edit, id } = useSelector((state: RootState) => state.form);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // Enable Zod validation
    defaultValues: {
      name: "",
      email: "",
      gender: "male" ,
      salary: 0,
    },
  });

  // Sync form values with Redux state when switching to edit mode
  useEffect(() => {
    if (edit && input) {
      // @ts-ignore
      form.reset(input); // Load user data into form in edit mode
    } else {
      form.reset({ name: "", email: "", gender: "male", salary: 0 }); // Reset for create mode
    }
  }, [edit, input, form]);

  // Single submit handler for both create and update
  const onSubmit =  async (values: z.infer<typeof formSchema>) => {
    if (edit) {
      console.log("Before dispatching", id)
      // await axios.put(`https://64a2d298b45881cc0ae5c169.mockapi.io/user/${id}`, values)
      dispatch(userUpdate({ id, values })); // Update existing user
    } else {
      dispatch(createUser(values)); // Create new user
    }
    form.reset(); // Reset form fields
    dispatch(resetForm()); // Reset Redux form state (edit, id, input)
  };

  return (
    <Form {...form}>
      <h1 className="text-center text-2xl font-bold">
        {edit ? "Update User" : "Register a New User"}
      </h1>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-1/3 mx-auto"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex gap-8"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="male" />
                  <FormLabel>Male</FormLabel>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="female" />
                  <FormLabel>Female</FormLabel>
                </div>
              </RadioGroup>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter your Salary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-[2/3] cursor-pointer">
          {edit ? "Update" : "Submit"}
        </Button>
      </form>
    </Form>
  );
};