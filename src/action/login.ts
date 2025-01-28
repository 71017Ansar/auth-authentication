"use server";
import { signIn } from "@/auth";


const credentialLogin = async ( email: string, password: string ) => {
   
   
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
  };
  export default credentialLogin;