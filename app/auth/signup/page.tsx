'use client'
import { loginWithGoogle } from "@/app/lib/google-auth"
import InputBox from "@/components/InputBox"
import { OtpCard } from "@/components/OtpCard"
import axios from "axios"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"



// WORKFLOW
// 1. enter inputs
// 2. send otp to mail
// 3. verify mail
// 4. create user success
// 5. show toast if any error in program

export default function Signup(){
    const length = 4
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRepassword] = useState("")
    const [otp, setOtp] = useState<string>("")
    const [otpSent, setOtpSent] = useState<boolean>(false)
    const [otpTimer, setOtpTimer] = useState<number>(60)
    const router = useRouter()
    
    const startTimer = () => {
        setOtpTimer(60)
    }
    
    async function handleSignup(){
        if(!name || !email || !password || !repassword){
            toast("Fill the inputs!")
            return
        }
        if(password !== repassword){
            toast("Re-entered password doesn't match!")
            return
        }
        try{
            await axios.post('/api/otp/generate', { name, email })
            toast.success("OTP sent to your email :)")
            setOtpSent(true)
            startTimer()
        } catch (error : any) {
            if (error.response) {
                console.log('Error Response:', error.response); 
                console.log('Error Message:', error.response.data.message); 
                toast.error(error.response.data.message); 
            } else if (error.request) {
                console.log('Error Request:', error.request);
                toast.error("No response from the server. Please try again.");
            } else {
                console.log('Error Message:', error.message);
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    }

    useEffect(()=>{
        if(otpTimer === 0 ) return;
        const timer = setTimeout(()=>{
            setOtpTimer(prev => prev - 1)
        }, 1000)

        return () => clearTimeout(timer)
    }, [otpTimer])


    const handleOtpSubmit = async() => {
        console.log(otp.length)
        if(otp.length !== 4){
            toast("Fill the OTP first!")
            return
        }
        if(!email){
            toast("Email not filled!")
            return
        }
        try {
            await axios.post("/api/otp/verify", { userOtp : otp, email })
            await axios.post("/api/auth/signup", { name, email, password })
            await signIn("credentials", {
                callbackUrl : '/track',
                email : email,
                password : password
            })
        } catch ( error : any ) {
            if (error.response) {
                console.log('Error Response:', error.response); 
                console.log('Error Message:', error.response.data.message); 
                toast.error(error.response.data.message); 
            } else if (error.request) {
                console.log('Error Request:', error.request);
                toast.error("No response from the server. Please try again.");
            } else {
                console.log('Error Message:', error.message);
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    }

    const handleResendOtp = async() => {
        if(otpTimer > 0)return;
        try{
            await axios.post('/api/otp/generate', { name, email })
            startTimer()
            toast.success("OTP sent to your email :)")
        } catch (error : any) {
            if (error.response) {
                console.log('Error Response:', error.response); 
                console.log('Error Message:', error.response.data.message); 
                toast.error(error.response.data.message); 
            } else if (error.request) {
                console.log('Error Request:', error.request);
                toast.error("No response from the server. Please try again.");
            } else {
                console.log('Error Message:', error.message);
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    }

    return (
        <div>
            {otpSent ? 
            <div className="backdrop-blur-2xl rounded-lg p-10 px-20 font-satoshi flex flex-col items-center gap-6">
                <div className="text-5xl font-bold bg-gradient-to-b from-gray-800 dark:from-white to-gray-400 bg-clip-text text-transparent p-5">Verify Mail</div>
                <OtpCard length={length} otp={otp} setOtp={setOtp}/>
                {otpTimer > 0 ? <div className="text-gray-300 group">Please wait <span className="text-lg text-white">{otpTimer}</span> seconds to resend OTP.</div> : <button className="underline text-gray-300 hover:text-white transition-all duration-200" onClick={handleResendOtp}>Resend OTP</button>}
                <div className="flex items-center justify-between mt-5 w-full mb-3">
                    <button className="border rounded-md p-2 px-8 bg-white text-black font-bold hover:bg-gray-300 transition-all duration-200" onClick={handleOtpSubmit}>Verify</button>
                    <div className="underline text-gray-300 cursor-pointer hover:text-white transition-all duration-200" onClick={()=>setOtpSent(false)}>Go Back</div>
                </div>
            </div>
            :
            <div className="backdrop-blur-2xl rounded-lg p-10 px-10 font-satoshi flex flex-col items-center gap-6">
                <div className="text-5xl font-bold bg-gradient-to-b from-gray-800 dark:from-white to-gray-400 bg-clip-text text-transparent p-5">SignUp Here</div>
                <InputBox state={name} setState={setName} placeholder="Swayam Duhan" label="Name"/>
                <InputBox state={email} setState={setEmail} placeholder="workplace.swayam@gmail.com" label="Email"/>
                <InputBox state={password} setState={setPassword} placeholder="@123#mysecretpass" label="Password" type="password"/>
                <InputBox state={repassword} setState={setRepassword} placeholder="@123#mysecretpass" label="Re-enter password" type="password"/>
                
                <div className="flex items-center justify-between mt-5 w-full mb-3 gap-10">
                    <div className="cursor-pointer" onClick={loginWithGoogle}>
                        <Image src="/google.png" alt="login_with_google" width="50" height="50" className="hover:drop-shadow-[0_4px_12px_rgba(255,255,255,0.4)] transition-all duration-200"/>
                    </div>
                    <button className="border rounded-md p-2 px-8 bg-white text-black font-bold hover:bg-gray-300 transition-all duration-200" onClick={handleSignup}>Submit</button>
                    <div className="underline text-gray-300 cursor-pointer" onClick={()=>router.push('/auth/signin')}>Existing User? Login</div>
                </div>
            </div>
            }
        </div>

    )
}