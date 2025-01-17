'use client'
import InputBox from "@/components/InputBox";
import { OtpCard } from "@/components/OtpCard";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";


// workflow : 
// 1. enter email 
// 2. send otp 
// 3. enter otp and verify
// 4. enter password 
// 5. save changes in db


export default function ForgotPassword(){

    const [email, setEmail] = useState("")
    const [emailEntered, setEmailEntered] = useState(false)
    const [otp, setOtp] = useState<string>("")
    const [otpEntered, setOtpEntered] = useState<boolean>(false)
    const router = useRouter()

    const handleSubmit = async() => {
        if(!email){
            toast("Enter valid email!")
            return
        }
        try{
            await axios.post("/api/otp/generate", { email })
            setEmailEntered(true)
        } catch (error : any) {
            if(error.response){
                toast.error(error.response.data.message)
            } else if (error.request){
                toast.error("No response from server!")
            } else {
                toast.error("Error occured!")
            }
        }
    }

    const handleOtpVerification = async() => {

    }

    const handlePasswordChange = async() => {

    }

    

    return (
    <div className="backdrop-blur-2xl rounded-lg p-10 px-20 font-satoshi flex flex-col items-center gap-8 shadow-xl">
        <div className="text-5xl font-bold bg-gradient-to-b from-gray-800 dark:from-white to-gray-400 bg-clip-text text-transparent p-5">Forgot Password</div>
        <InputBox state={email} setState={setEmail} placeholder="Enter Email" label="Email"/>
        {emailEntered && 
            <OtpCard otp={otp} setOtp={setOtp} length={4}/>
        }
        
        <div className="flex justify-between items-center w-full mb-5 mt-5">
            {emailEntered ? 
            <button className="border rounded-md p-2 px-8 bg-white text-black font-bold hover:bg-gray-300 transition-all duration-200">Verify</button>
            :
            <button className="border rounded-md p-2 px-8 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black font-bold dark:hover:bg-gray-300 transition-all duration-200" onClick={handleSubmit}>Submit</button>
            }
            <button className="rounded-md p-2 px-8 bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:text-white font-bold dark:hover:bg-white/15 transition-all duration-200" onClick={()=>router.push('/auth/signin')}>Go Back</button>
        </div>
    </div>
    )
}