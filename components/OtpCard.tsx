import React, { useRef, useState } from "react"

interface OTPInputProps {
    otp : string;
    setOtp : any;
    length : number
}

export function OtpCard({ otp, setOtp, length = 4 } : OTPInputProps){

    const [otpArray, setOtpArray] = useState<string[]>(new Array(length).fill(""))
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    console.log(otp)

    const focusInput = (index : number) => {
        if(inputRefs.current[index]){
            inputRefs.current[index].focus()
        }
    }

    const handleChange = (index : number, value : string) => {
        if(isNaN(Number(value))) return;
        
        const newOtp = [...otpArray];
        newOtp[index] = value
        setOtpArray(newOtp)

        if(value && index < length - 1){
            focusInput(index + 1)
        }

        const otpString = newOtp.join("")
        setOtp(otpString)
    }

    const handleKeyDown = (index : number, e : React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Backspace' && index > 0 && !otpArray[index]){
            focusInput(index - 1)
        } else if (e.key === 'ArrowLeft' && index > 0 ){
            focusInput(index - 1)
        } else if (e.key === 'ArrowRight' && index < length - 1){
            focusInput(index + 1)
        }
    }

    return (
        <div className="flex flex-col w-full gap-4">
            <div className="font-bold">Enter OTP :</div>
            <div className="flex justify-around items-center gap-4">
                {otpArray.map((digit, index) => (
                    <React.Fragment key={index}>
                        <input 
                            ref={(ref) => {inputRefs.current[index] = ref}}
                            maxLength={1}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            inputMode="numeric"
                            type="text"
                            value={digit}
                            className="h-12 w-12 rounded-md bg-black/30 border-b border-r hover:bg-black/10 duration-200 transition-all font-bold text-2xl text-center focus:outline-none"
                        />
                        {index < length - 1 && 
                            <div className="bg-black dark:bg-white rounded-lg h-1 w-1"></div>
                        }
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}