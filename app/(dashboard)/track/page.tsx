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
                <div className="text-[var(--foreground-dark)] grid grid-cols-2 gap-10 p-2 rounded-md p-20 pt-40">
                    <InputComponent />
                    <OutputComponent />
                </div>
            </JotaiProvider>
            <Footer />
        </div>
    )
}