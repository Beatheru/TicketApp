"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/actions";

export const formSchema = z
  .object({
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(1, { message: "Please enter a password" })
  })
  .required();

const Error = ({ error }: { error: string }) => {
  if (error) return <div className="text-red-600 text-center">{error}</div>;
  else return null;
};

const RegisterForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const err = await registerUser(values);

    if (err) {
      setError(err);
      return;
    }

    router.push("/login");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-center items-center h-3/4"
      >
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Register An Account
            </CardTitle>
            <Error error={error} />
          </CardHeader>

          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Link
              href="/login"
              className="font-medium text-primary underline underline-offset-4 text-center"
            >
              Login
            </Link>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button type="submit" className="w-full">
              {" "}
              Submit{" "}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default RegisterForm;
