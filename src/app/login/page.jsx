"use client";

import { Card, Separator } from "@heroui/react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (data) router.push("/");
    if (error) alert("Error: " + error.message);
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({ provider: "google" });
  };

  return (
    <div className="max-w-xl mx-auto my-10">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-gray-500">Resume your adventure with Wanderlust</p>
      </div>

      <Card className="border rounded-none p-6">
        <Form onSubmit={onSubmit} className="flex flex-col gap-4">
          <TextField isRequired name="email" type="email">
            <Label>Email Address</Label>
            <div className="flex items-center border px-3 gap-2">
              <MdOutlineEmail className="text-gray-400" />
              <Input
                placeholder="Enter your email"
                className="border-0 outline-none"
              />
            </div>
            <FieldError />
          </TextField>

          <TextField isRequired name="password" type="password">
            <Label>Password</Label>
            <div className="flex items-center border px-3 gap-2">
              <RiLockPasswordLine className="text-gray-400" />
              <Input
                placeholder="Enter your password"
                className="border-0 outline-none"
              />
            </div>
            <FieldError />
          </TextField>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="remember" /> Remember me
            </label>
            <Link href="#" className="text-cyan-500">
              Forgot password?
            </Link>
          </div>

          <Button
            className="rounded-none w-full bg-cyan-500 text-white"
            type="submit"
          >
            Sign In
          </Button>
        </Form>

        <div className="flex justify-center items-center gap-3 my-4">
          <Separator />
          <span className="whitespace-nowrap text-sm">Or continue with</span>
          <Separator />
        </div>

        <Button
          onClick={handleGoogleSignin}
          variant="outline"
          className="w-full rounded-none"
        >
          <FcGoogle /> Sign Up With Google
        </Button>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link href="/signup" className="text-cyan-500">
            Sign Up
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
