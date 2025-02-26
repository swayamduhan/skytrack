import { JotaiProvider } from "@/app/JotaiProvider"
import { AuthProvider } from "@/app/provider"
import Footer from "@/components/Footer"
import InputComponent from "@/components/InputComponent"
import Navbar from "@/components/Navbar"
import { OutputComponent } from "@/components/OutputComponent"

export default async function Track(){
    return (
        <div className="dark:bg-[var(--background-dark)] min-h-screen overflow-hidden inset-0 relative">
            <JotaiProvider>
                <AuthProvider>
                    <Navbar />
                </AuthProvider>
                <div className="flex min-h-screen xl:max-h-[100vh] justify-center items-center gap-10 xl:px-20 py-28 sm:py-40">
                    <div className="grid xl:grid-cols-2 gap-10 w-full max-w-[100vw] lg:max-w-[1500px] p-2">
                        <InputComponent />
                        <OutputComponent />
                    </div>
                </div>
            </JotaiProvider>
            <Footer />
        </div>
    )
}