import { prisma } from "@/prisma/prisma";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"

export const NEXT_AUTH_CONFIG : NextAuthOptions = {
    providers : [
        CredentialsProvider({
            name : 'Credentials',
            credentials : {
                email : { label : 'email', type : 'text', placeholder : ''},
                password : { label : 'password', type : 'password' ,placeholder : ''}
            },
            async authorize(credentials : any) : Promise<any>{

                if(!(credentials.email && credentials.password)){
                    throw new Error("PLEASE_ENTER_CREDENTIALS")
                }

                const user = await prisma.user.findUnique({
                    where : { email : credentials.email }
                })

                if(!user){
                    throw new Error("USER_DOESNT_EXIST")
                }

                const isValidPassword = await bcrypt.compare(credentials.password, user.password)

                if(!isValidPassword){
                    throw new Error("INCORRECT_PASSWORD")
                }

                return {
                    id : user.id,
                    name : user.name,
                    email : user.email
                }
            }
        })
    ],
    secret : process.env.NEXTAUTH_SECRET,
    pages : {
        signIn : '/auth/signin'
    },
    callbacks : {
        async session({ session, token } : any) {
            if(session.user){
                session.user.id = token.id
            }
            return session
        },
        async jwt({ token, user } : any) {
            if(user){
                token.id = user.id
                token.email = user.email
            }
            return token
        }
    }
}