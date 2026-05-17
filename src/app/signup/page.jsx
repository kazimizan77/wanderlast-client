"use client";

import { Card, Separator } from "@heroui/react";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import Link from "next/link";

const SignUpPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
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
        <h1 className="text-3xl font-bold">Create Account</h1>
        <p className="text-gray-500">Start your adventure with Wanderlust</p>
      </div>

      <Card className="border rounded-none p-6">
        <Form onSubmit={onSubmit} className="flex flex-col gap-4">
          <TextField isRequired name="name" type="text">
            <Label>Full Name</Label>
            <div className="flex items-center border px-3 gap-2">
              <FaRegUser className="text-gray-400" />
              <Input placeholder="Enter your name" className="border-0 outline-none" />
            </div>
            <FieldError />
          </TextField>

          <TextField isRequired name="email" type="email">
            <Label>Email Address</Label>
            <div className="flex items-center border px-3 gap-2">
              <MdOutlineEmail className="text-gray-400" />
              <Input placeholder="Enter your email" className="border-0 outline-none" />
            </div>
            <FieldError />
          </TextField>

          <TextField isRequired name="password" type="password" minLength={8}>
            <Label>Password</Label>
            <div className="flex items-center border px-3 gap-2">
              <RiLockPasswordLine className="text-gray-400" />
              <Input placeholder="Create a password" className="border-0 outline-none" />
            </div>
            <FieldError />
          </TextField>

          <TextField isRequired name="confirmPassword" type="password">
            <Label>Confirm Password</Label>
            <div className="flex items-center border px-3 gap-2">
              <RiLockPasswordLine className="text-gray-400" />
              <Input placeholder="Confirm your password" className="border-0 outline-none" />
            </div>
            <FieldError />
          </TextField>

          <Button className="rounded-none w-full bg-cyan-500 text-white" type="submit">
            Create Account
          </Button>
        </Form>

        <div className="flex justify-center items-center gap-3 my-4">
          <Separator />
          <span className="whitespace-nowrap text-sm">Or sign up with</span>
          <Separator />
        </div>

        <Button onClick={handleGoogleSignin} variant="outline" className="w-full rounded-none">
          <FcGoogle /> Sign Up With Google
        </Button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-500">Sign In</Link>
        </p>
      </Card>
    </div>
  );
};

export default SignUpPage;