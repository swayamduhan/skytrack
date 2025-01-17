import { Heart } from "lucide-react"
export default function Footer(){
    return (
        <div className="absolute font-satoshi z-10 w-full p-6 bottom-0 flex justify-between items-center">
            <div className="flex gap-2 items-center text-lg text-slate-500 dark:text-white/50">made with <Heart color="#F5493D"/> by <span className="text-slate-700 font-bold dark:text-white">Swayam Duhan</span></div>
            <div className="font-bold text-xl dark:text-[var(--foreground-dark)]">// 2024</div>
        </div>
    )
}