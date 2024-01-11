"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
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

const Error = ({ error }: { error: string }) => {
  if (error) return <div className="text-red-600 text-center">{error}</div>;
  else return null;
};

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const formSchema = z
    .object({
      username: z.string().min(1, { message: "Username is required" }),
      password: z.string().min(1, { message: "Password is required" })
    })
    .required();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await signIn("credentials", {
      ...values,
      redirect: false
    });

    if (res?.ok) {
      router.push("/");
    } else {
      setError("Invalid credentials");
    }
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
              Login
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
              href="/register"
              className="font-medium text-primary underline underline-offset-4 text-center"
            >
              Register
            </Link>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default LoginForm;
