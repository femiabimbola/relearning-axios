"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { AppDispatch, RootState } from "@/redux/store";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createUser, userUpdate } from "@/redux/action";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector} from "react-redux";
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
  const { input, edit, id } = useSelector((state: any) => state.form);

  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      name: input.name,
      email: input.email,
      gender: "male",
      salary: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    dispatch(createUser(values));
    form.reset();
  };

  const onChangeHandler = (e: any) => {
    dispatch(setInput({ [e.target.name]: e.target.value }));
    console.log("The console in the change", id, input)
  };
  
  useEffect(() =>{
    console.log(id)
    console.log(input)
  })

  const onUpdate = () => {
    console.log(id, input)
    dispatch(userUpdate({id, input}))
    form.reset()
  }

  return (
    <Form {...form}>
      <h1 className="text-center text-2xl font-bold"> Register a new user</h1>
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
                <Input placeholder="Enter your name" {...field} value={input.name}  onChange={onChangeHandler} />
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
                <Input placeholder="Enter your email" {...field} value={input.email}  onChange={onChangeHandler}/>
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
                className="flex gap-8"
                // onValueChange={onChangeHandler}
                onChange={onChangeHandler}
                // onValueChange={field.onChange}
                // value={input.gender}
              >
                <div className="flex items-center gap-3">
                  <FormControl>
                    <RadioGroupItem value="male" />
                  </FormControl>
                  <FormLabel>Male</FormLabel>
                </div>
                <div className="flex items-center gap-3">
                  <FormControl>
                    <RadioGroupItem value="female" />
                  </FormControl>
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
                <Input placeholder="Enter your Salary" {...field} value={input.salary}  onChange={onChangeHandler}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        { edit ? (
        <Button  className="w-[2/3] cursor-pointer" onClick={onUpdate} type="submit">
          Update
        </Button>
        ):  <Button type="submit" className="w-[2/3] cursor-pointer">
        Submit
      </Button>
}
      </form>
    </Form>
  );
};
