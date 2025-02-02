import { JotaiProvider } from "@/app/JotaiProvider"
import { AuthProvider } from "@/app/provider"
import Footer from "@/components/Footer"
import InputComponent from "@/components/InputComponent"
import Navbar from "@/components/Navbar"
import { OutputComponent } from "@/components/OutputComponent"

export default async function Track(){
    return (
        <div className="dark:bg-[var(--background-dark)] min-h-screen inset-0 relative">
            <JotaiProvider>
                <AuthProvider>
                    <Navbar />
                </AuthProvider>
                <div className="flex min-h-screen max-h-[100vh] justify-center items-center gap-10 px-20 py-40">
                    <div className="grid grid-cols-2 gap-10 w-full max-w-[1500px]">
                        <InputComponent />
                        <OutputComponent />
                    </div>
                </div>
            </JotaiProvider>
            <Footer />
        </div>
    )
}