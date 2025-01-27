"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import User from "@/model/userModel";
import dbConnect from "@/lib/utils";
import bcrypt from "bcryptjs";

const Page = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSignup = async (formdata : FormData) => {
    "use server";
    dbConnect();
 
    const name = formdata.get("name") as string | undefined;
    const email = formdata.get("email") as string | undefined;
    
    const password = formdata.get("password") as string | undefined;
 

 


    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }
    const user = await User.findOne({ email });
    if (user) {
      setError("User already exists");
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    router.push("/login");

   
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-full max-w-md shadow-2xl border border-gray-200 bg-white rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">Sign Up</CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Create your account to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <form action={handleSignup} className="space-y-4">
            <Input
              type="text"
              name="name"
              placeholder="Username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <Button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center flex flex-col gap-4">
          <span className="text-gray-500">or</span>
          <Button
            type="button"
            className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
          >
            Login with Google
          </Button>
          <Link href="/login" className="text-sm text-indigo-600 hover:underline">
            Already have an account? Log In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;

