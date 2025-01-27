import Link from "next/link";
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
import { signIn } from "@/auth";

const Page = () => {
  const loginHandler = async (formdata : FormData)=>{
    "use server";
    const email = formdata.get("email") as string | undefined;
    const password = formdata.get("password") as string | undefined;
    if(!email || !password){
      throw new Error("Please fill all fields")
    }
    try {
      await signIn("credentials", {
         email,
         password,
         redirect : true,
         redirectTo : "/"})
    } catch (error) {
      throw new Error("Something went wrong")
    }
  }
  return (
    <div className=" h-screen flex justify-center items-center">
      <Card className="w-full max-w-md shadow-2xl border border-gray-200 bg-white rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">Login</CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Welcome back! Please enter your details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginHandler} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              name = "email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <Input
              type="password"
              placeholder="Password"
              name = "password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <Button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
            >
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center flex flex-col gap-4">
          <span className="text-gray-500">or</span>
          <form action="">
            <Button
              type="submit"
              className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
            >
              Login with Google
            </Button>
          </form>
          <Link href="/signup"  className="text-sm text-indigo-600 hover:underline">
            
              Don't have an account? Sign Up
            
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;

