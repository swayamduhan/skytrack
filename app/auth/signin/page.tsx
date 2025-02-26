'use client'
import { loginWithGoogle } from "@/app/lib/google-auth"
import InputBox from "@/components/InputBox"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function Signin(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    async function handleLogin(){
        try{
            const response = await signIn("credentials", {
                email : email,
                password : password,
                callbackUrl : "/track"
            })
            if(response?.error){
                toast.error(response.error)
            }
        } catch(error) {
            toast.error("Unable to process at the moment :(")
            console.log(error)
        }
    }

    return (
        <div className="backdrop-blur-2xl rounded-lg m-4 p-6 md:p-10 px-8 md:px-20 font-satoshi flex flex-col items-center gap-8 shadow-lg">
            <div className="text-5xl font-bold bg-gradient-to-b from-gray-800 dark:from-white to-gray-400 bg-clip-text text-transparent py-4">SignIn Here</div>
            <InputBox state={email} setState={setEmail} placeholder="Enter Email" label="Email"/>
            <InputBox state={password} setState={setPassword} placeholder="Enter Password" label="Password"/>
            
            <div className="flex justify-between items-center w-full mt-5">
                <button className="border rounded-md p-2 px-8 bg-black text-white dark:bg-white dark:text-black font-bold hover:bg-gray-700 dark:hover:bg-gray-300 transition-all duration-200" onClick={handleLogin}>Submit</button>
                <div className="cursor-pointer" onClick={loginWithGoogle}>
                    <Image src="/google.png" alt="login_with_google" width="50" height="50" className="hover:drop-shadow-[0_4px_12px_rgba(255,255,255,0.4)] transition-all duration-200"/>
                </div>
            </div>
            <div className="flex justify-between items-center underline text-gray-600 dark:text-gray-400 mb-5 w-full">
                <div className="cursor-pointer hover:text-black dark:hover:text-white" onClick={()=>router.push('/auth/signup')}>New User? Signup.</div>
                <div className="cursor-pointer hover:text-black dark:hover:text-white" onClick={()=>router.push('/auth/forgot')}>Forgot Pass?</div>
            </div>
        </div>
    )
}