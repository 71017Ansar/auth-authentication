" use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import credentialLogin from "@/action/login";

    const LoginForm = () => {

        return (
            <form action={    async    ( formdata) =>{
            const   email = formdata.get("email") as string | undefined;
            const  password = formdata.get ("password") as string | undefined;
            if(!email || !password){
              throw new Error("Please fill all fields")
              }
              try {
                await credentialLogin(email, password);
                console.log("Login Success");
              } catch (error) {
                throw new Error("Something went wrong");
              }
            
                                                 
            } } className="space-y-4">
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
        );

        
   
};
export default LoginForm;