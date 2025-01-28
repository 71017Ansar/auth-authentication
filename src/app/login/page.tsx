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

import LoginForm from "@/components/ui/client/form";

const Page = () => {
 
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
         <LoginForm/>
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

