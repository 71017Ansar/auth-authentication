import NextAuth, { CredentialsSignin } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import Email from "next-auth/providers/email"
import User from "@/model/userModel"
import {compare} from "bcryptjs"
import dbConnect from "@/lib/utils";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
            email: { label: "Email", type: "email", placeholder : " Enter your email" },
            password: {  label: "Password", type: "password" }
        },
        authorize: async (credentials) => {

            const email = credentials?.email  as string | undefined ;
            const password = credentials?.password  as string | undefined ;

                console.log(email, password)
                if (!email || !password ) 
                    throw new CredentialsSignin({
                cause: 'both are invaild credentials',}
            )
            await dbConnect()

            const user =  await User.findOne({email}).select("+password")
            console.log(user)
            if( !user)
                throw new CredentialsSignin({
                cause: 'invalid_email',}
                );

                const isMatch = await compare(password , user.password )
                console.log(isMatch)
                if( !isMatch)
                throw new CredentialsSignin(" invalid credinatials"
                )

           return { name : user.name , email : user.email , id : user._id}

        }
    })
  ],
  pages : {
    signIn : '/login'
  },

});