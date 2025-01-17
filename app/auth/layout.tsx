import { DarkModeButton } from "@/components/DarkModeButton";
import { JotaiProvider } from "../JotaiProvider";

export default function AuthLayout({ children } : { children: React.ReactNode }) {

  return (
    <div className="dark:bg-[var(--background-dark)] min-h-screen dark:text-white relative max-w-screen flex items-center justify-center">
        <div className="text-lg dark:text-white/65 tracking-[4px] font-mono absolute top-6 right-6 z-10">
            <JotaiProvider>
                <DarkModeButton />
            </JotaiProvider>
        </div>


        <div
        className="bg-[radial-gradient(ellipse,rgba(124,124,124,0.623)_20%,#b3b2b2a7_40%,#efefef_80%)] dark:bg-[radial-gradient(ellipse,rgba(75,101,111,0.59)_20%,rgba(51,66,79,0.54)_40%,rgb(0,0,0)_80%)]"
        style={{
          inset: 0,
          position: "absolute",
          WebkitMaskImage:
            "linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)",
          WebkitMaskSize: "6rem 6rem",
          WebkitMaskRepeat: "repeat",
          maskImage:
            "linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)",
          maskSize: "4rem 4rem",
          maskRepeat: "repeat",
          pointerEvents: "none",
        }}
        ></div>


        <div className="absolute min-h-screen inset-0 flex items-center justify-center">
            <div className="w-2/3 h-4/5 relative">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Airplane.png" alt="Airplane" width="100" height="100" className="absolute top-[10%] left-[] rotate-[-20deg]"/>
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Cloud.png" alt="Cloud" width="100" height="100" className="absolute bottom-[20%] left-[10%]"/>
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Eight O’Clock.png" alt="Eight O’Clock" width="100" height="100" className="absolute top-[7%] right-[23%]"/>
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Sun.png" alt="Sun" width="100" height="100" className="absolute top-[50%] right-[5%]"/>
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Airplane.png" alt="Airplane" width="100" height="100" className="absolute bottom-[0%] right-[35%] rotate-[-70deg]"/>
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Cloud.png" alt="Cloud" width="100" height="100" className="absolute top-[30%] left-[40%]"/>
            </div>
        </div>
        {children}
    </div>
  );
}